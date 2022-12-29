import { useWalletInfo } from "@components/hooks/web3";
import { Button } from "@components/ui/common";
import { getAllCourses } from "@components/ui/content/courses/fetcher";
import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { OrderModal } from "@components/ui/order";
import { useState } from "react";
import { MarketHeader } from "@components/ui/marketplace";

function Marketplace({ courses }) {
	const [selectedCourse, setSelectedCourse] = useState(null);
	const { canPurchaseCourse } = useWalletInfo();
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
