import { useWalletInfo } from "@components/hooks/web3";
import { Button } from "@components/ui/common";
import { getAllCourses } from "@components/ui/content/courses/fetcher";
import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { OrderModal } from "@components/ui/order";
import { useState } from "react";
import { MarketHeader } from "@components/ui/marketplace";
import { useWeb3 } from "@components/providers";

function Marketplace({ courses }) {
	const { web3, contract } = useWeb3();
	const { canPurchaseCourse, account } = useWalletInfo();
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
			console.log(result,'hey');
		} catch {
			console.error("Purchase course: Operation has failed.");
		}
	};
	return (
		<>
			<div className='py-4'>
				<MarketHeader />
			</div>
			<CourseList courses={courses}>
				{(course) => (
					<CourseCard
						course={course}
						key={course.id}
						disabled={!canPurchaseCourse}
						Footer={() => (
							<div className='mt-4'>
								<Button
									variant='lightPurple'
									disabled={!canPurchaseCourse}
									onClick={() => setSelectedCourse(course)}
								>
									Purchase
								</Button>
							</div>
						)}
					/>
				)}
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
