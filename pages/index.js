import { Hero } from "@components/ui/common";
import { getAllCourses } from "@components/ui/content/courses/fetcher";
import { CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";

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
