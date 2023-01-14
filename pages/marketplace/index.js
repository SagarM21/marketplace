import { useWalletInfo, useOwnedCourses } from "@components/hooks/web3";
import { Button, Loader, Message } from "@components/ui/common";
import { getAllCourses } from "@components/ui/content/courses/fetcher";
import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { OrderModal } from "@components/ui/order";
import { useState } from "react";
import { MarketHeader } from "@components/ui/marketplace";
import { useWeb3 } from "@components/providers";

function Marketplace({ courses }) {
	const { web3, contract, requireInstall } = useWeb3();
	const { hasConnectedWallet, isConnecting, account } = useWalletInfo();
	const { ownedCourses } = useOwnedCourses(courses, account.data);
	const [selectedCourse, setSelectedCourse] = useState(null);

	const purchaseCourse = async (order) => {
		const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id);
		console.log(hexCourseId);

		const orderHash = web3.utils.soliditySha3(
			{ type: "bytes16", value: hexCourseId },
			{ type: "address", value: account.data }
		);

		console.log(orderHash);

		const emailHash = web3.utils.sha3(order.email);

		console.log(emailHash);

		const proof = web3.utils.soliditySha3(
			{ type: "bytes32", value: emailHash },
			{ type: "bytes32", value: orderHash }
		);

		console.log(proof);

		const value = web3.utils.toWei(String(order.price));

		try {
			const result = await contract.methods
				.purchaseCourse(hexCourseId, proof)
				.send({ from: account.data, value });
			// console.log(result, "hey");
		} catch {
			console.error("Purchase course: Operation has failed.");
		}
	};
	return (
		<>
			<MarketHeader />
			<CourseList courses={courses}>
				{(course) => {
					const owned = ownedCourses.lookup[course.id];
					return (
						<CourseCard
							key={course.id}
							course={course}
							state={owned?.state}
							disabled={!hasConnectedWallet}
							Footer={() => {
								if (requireInstall) {
									return (
										<Button disabled={true} variant='lightPurple' sie='sm'>
											Install
										</Button>
									);
								}

								if (isConnecting) {
									return (
										<Button disabled={true} variant='lightPurple' size='sm'>
											<Loader size='sm' />
										</Button>
									);
								}

								if (!ownedCourses.hasInitialResponse) {
									return <div style={{ height: "50px" }}></div>;
								}

								if (owned) {
									return (
										<>
											<div>
												<Button disabled={true} variant='green' size='sm'>
													Owned
												</Button>
												{owned.state === "deactivated" && (
													<Button
														disabled={false}
														onClick={() => alert("Re-activating")}
														variant='purple'
														size='sm'
													>
														Fund to Activate
													</Button>
												)}
											</div>
										</>
									);
								}

								return (
									<Button
										onClick={() => setSelectedCourse(course)}
										disabled={!hasConnectedWallet}
										variant='lightPurple'
										size='sm'
									>
										Purchase
									</Button>
								);
							}}
						/>
					);
				}}
			</CourseList>
			{selectedCourse && (
				<OrderModal
					course={selectedCourse}
					onSubmit={purchaseCourse}
					onClose={() => setSelectedCourse(null)}
				/>
			)}
		</>
	);
}
export default function PageInjections({ ...props }) {
	return (
		<BaseLayout>
			<Marketplace {...props} />
		</BaseLayout>
	);
}

export function getStaticProps() {
	const { data } = getAllCourses();
	return {
		props: {
			courses: data,
		},
	};
}
