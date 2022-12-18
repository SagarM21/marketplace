import { useWeb3 } from "@components/providers";
import { Hero } from "@components/ui/common";
import { getAllCourses } from "@components/ui/content/courses/fetcher";
import { CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";

function Home({ courses }) {
	const { web3, isInitialized } = useWeb3();
	console.log(web3);
	return (
		<>
			{isInitialized ? "IS INIT" : "NOT INIT"}
			<Hero />
			<CourseList courses={courses} />
		</>
	);
}
export default function PageInjections({ ...props }) {
	return (
		<BaseLayout>
			<Home {...props} />
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
