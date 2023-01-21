import { useWalletInfo, useOwnedCourses } from "@components/hooks/web3";
import { Button, Loader, Message } from "@components/ui/common";
import { getAllCourses } from "@components/ui/content/courses/fetcher";
import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { OrderModal } from "@components/ui/order";
import { useState } from "react";
import { MarketHeader } from "@components/ui/marketplace";
import { useWeb3 } from "@components/providers";
import { withToast } from "test/utils/toast";

function Marketplace({ courses }) {
	const { web3, contract, requireInstall } = useWeb3();
	const { hasConnectedWallet, isConnecting, account } = useWalletInfo();
	const { ownedCourses } = useOwnedCourses(courses, account.data);
	const [selectedCourse, setSelectedCourse] = useState(null);
	const [busyCourseId, setBusyCourseId] = useState(null);
	const [isNewPurchase, setIsNewPurchase] = useState(true);

	const purchaseCourse = async (order, course) => {
		const hexCourseId = web3.utils.utf8ToHex(course.id);
		console.log(hexCourseId);

		const orderHash = web3.utils.soliditySha3(
			{ type: "bytes16", value: hexCourseId },
			{ type: "address", value: account.data }
		);

		console.log(orderHash);

		const value = web3.utils.toWei(String(order.price));
		setBusyCourseId(course.id);

		if (isNewPurchase) {
			const emailHash = web3.utils.sha3(order.email);
			const proof = web3.utils.soliditySha3(
				{ type: "bytes32", value: emailHash },
				{ type: "bytes32", value: orderHash }
			);

			withToast(_purchaseCourse({ hexCourseId, proof, value }, course));
		} else {
			withToast(_repurchaseCourse({ courseHash: orderHash, value }, course));
		}
	};
	const _purchaseCourse = async ({ hexCourseId, proof, value }, course) => {
		try {
			const result = await contract.methods
				.purchaseCourse(hexCourseId, proof)
				.send({ from: account.data, value });
			// console.log(result, "hey");
			ownedCourses.mutate([
				...ownedCourses.data,
				{
					...course,
					proof,
					state: "purchased",
					owner: account.data,
					price: value,
				},
			]);
			return result;
		} catch {
			throw new Error(error.message);
		} finally {
			setBusyCourseId(null);
		}
	};

	const _repurchaseCourse = async ({courseHash, value}, course) => {
		try {
			const result = await contract.methods
				.repurchaseCourse(courseHash)
				.send({ from: account.data, value });

			ownedCourses.mutate()
			return result;
		} catch {
			throw new Error(error.message);
		} finally {
			setBusyCourseId(null);
		}
	};

	const cleanupModal = () => {
		setSelectedCourse(null);
		setIsNewPurchase(true);
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
									return (
										<Button variant='white' disabled={true} size='sm'>
											Loading State...
										</Button>
									);
								}

								const isBusy = busyCourseId === course.id;

								if (owned) {
									return (
										<>
											<div className='flex'>
												<Button
													onClick={() => alert("You are owner of this course.")}
													disabled={false}
													variant='white'
													size='sm'
												>
													Yours &#10004;
												</Button>
												{owned.state === "deactivated" && (
													<div className='ml-1'>
														<Button
															size='sm'
															disabled={false}
															onClick={() => {
																setIsNewPurchase(false);
																setSelectedCourse(course);
															}}
															variant='purple'
														>
															Fund to Activate
														</Button>
													</div>
												)}
											</div>
										</>
									);
								}

								return (
									<Button
										onClick={() => setSelectedCourse(course)}
										disabled={!hasConnectedWallet || isBusy}
										variant='lightPurple'
										size='sm'
									>
										{isBusy ? (
											<div className='flex'>
												<Loader size='sm' />
												<div className='ml-2'>In Progress</div>
											</div>
										) : (
											<div>Purchase</div>
										)}
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
					isNewPurchase={isNewPurchase}
					onSubmit={(formData, course) => {
						purchaseCourse(formData, course);
						cleanupModal();
					}}
					onClose={() => {
						cleanupModal;
					}}
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
