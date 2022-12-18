import { Hero } from "@components/ui/common";
import { getAllCourses } from "@components/ui/content/courses/fetcher";
import { CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";

function Home({ courses }) {
	return (
		<>
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
