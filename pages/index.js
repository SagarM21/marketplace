import { Hero } from "@components/common";
import { getAllCourses } from "@components/content/courses/fetcher";
import { CourseList } from "@components/course";
import { BaseLayout } from "@components/layout";

export default function Home({ courses }) {
	return (
		<BaseLayout>
			<Hero />
			
			<CourseList courses={courses} />
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
