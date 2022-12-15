import { Modal } from "@components/common";
import { getAllCourses } from "@components/content/courses/fetcher";
import { Curriculum, CourseHero, KeyPoints } from "@components/course";
import { BaseLayout } from "@components/layout";

export default function Course({ course }) {
	return (
		<BaseLayout>
			<div className='py-4'>
				<CourseHero
					title={course.title}
					description={course.description}
					image={course.coverImage}
				/>
			</div>
			<KeyPoints points={course.wsl} />
			<Curriculum locked={true} />
			<Modal />
		</BaseLayout>
	);
}

export function getStaticPaths() {
	const { data } = getAllCourses();
	return {
		paths: data.map((c) => ({
			params: {
				slug: c.slug,
			},
		})),
		fallback: false,
	};
}

export function getStaticProps({ params }) {
	const { data } = getAllCourses();
	const course = data.filter((c) => c.slug === params.slug)[0];
	return {
		props: {
			course,
		},
	};
}
