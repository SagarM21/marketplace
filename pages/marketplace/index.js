import { useEthPrice } from "@components/hooks/useEthPrice";
import { useAccount, useNetwork } from "@components/hooks/web3";
import { Button } from "@components/ui/common";
import { getAllCourses } from "@components/ui/content/courses/fetcher";
import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { OrderModal } from "@components/ui/order";
import { EthRates, WalletBar } from "@components/ui/web3";
import { useState } from "react";

function Marketplace({ courses }) {
	const [selectedCourse, setSelectedCourse] = useState(null);
	const { account } = useAccount();
	const { network } = useNetwork();
	const { eth } = useEthPrice();

	const canPurchaseCourse = !!(account.data && network.isSupported);
	return (
		<>
			<div className='py-4'>
				<WalletBar
					address={account.data}
					network={{
						data: network.data,
						target: network.target,
						isSupported: network.isSupported,
						hasInitialResponse: network.hasInitialResponse,
					}}
				/>
				<EthRates eth={eth.data} ethPerItem={eth.perItem} />
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
