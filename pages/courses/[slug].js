import { Modal } from "@components/common";
import { Curriculum, CourseHero, KeyPoints } from "@components/course";
import { BaseLayout } from "@components/layout";

export default function Course() {
	return (
		<BaseLayout>
			<div className='py-4'>
				<CourseHero />
			</div>
			<KeyPoints />
			<Curriculum />
			<Modal />
		</BaseLayout>
	);
}
