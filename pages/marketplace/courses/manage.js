import { OwnedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";

function ManageCourses() {
	return (
		<>
			<div className='py-4'>
				<MarketHeader />
			</div>
			<section className='grid grid-cols-1'>
				<OwnedCourseCard />
			</section>
		</>
	);
}

export default function PageInjections({ ...props }) {
	return (
		<BaseLayout>
			<ManageCourses {...props} />
		</BaseLayout>
	);
}


