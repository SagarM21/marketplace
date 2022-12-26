import { useAccount, useNetwork } from "@components/hooks/web3";
import { Button, Hero } from "@components/ui/common";
import { getAllCourses } from "@components/ui/content/courses/fetcher";
import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { WalletBar } from "@components/ui/web3";

function Marketplace({ courses }) {
	const { account } = useAccount();
	const { network } = useNetwork();
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
			</div>
			<CourseList courses={courses}>
				{(course) => (
					<CourseCard
						course={course}
						key={course.id}
						Footer={() => (
							<div className='mt-4'>
								<Button variant='lightPurple'>Purchase</Button>
							</div>
						)}
					/>
				)}
			</CourseList>
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
