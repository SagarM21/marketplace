import { Hero } from "@components/ui/common";
import { getAllCourses } from "@components/ui/content/courses/fetcher";
import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";

function Home({ courses }) {
	return (
		<>
			<Hero />
			<CourseList courses={courses}>
				{" "}
				{(course) => <CourseCard course={course} key={course.id} />}{" "}
			</CourseList>
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
