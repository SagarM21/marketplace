import { useAccount } from "@components/hooks/web3/useAccount";
import { Hero } from "@components/ui/common";
import { getAllCourses } from "@components/ui/content/courses/fetcher";
import { CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { WalletBar } from "@components/ui/web3";

function Marketplace({ courses }) {
	const { account } = useAccount();
	return (
		<>
			<div className='py-4'>
				<WalletBar address={account.data} />
			</div>
			<CourseList courses={courses} />
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
