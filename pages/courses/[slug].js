import { Modal } from "@components/ui/common";
import { getAllCourses } from "@components/ui/content/courses/fetcher";
import { Curriculum, CourseHero, KeyPoints } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { useAccount, useOwnedCourse } from "@components/hooks/web3";

function Course({ course }) {
	const { account } = useAccount();
	const { ownedCourse } = useOwnedCourse(course, account.data);
	console.log(ownedCourse);
	return (
		<>
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
		</>
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

export default function Wrapper({ ...props }) {
	return (
		<BaseLayout>
			<Course {...props} />
		</BaseLayout>
	);
}
