import { OwnedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { Button, Message } from "@components/ui/common";
import { useOwnedCourses } from "@components/hooks/web3";

function OwnedCourses() {
	const { ownedCourses } = useOwnedCourses();
	return (
		<>
			{ownedCourses.data}
			<div className='py-4'>
				<MarketHeader />
			</div>
			<section className='grid grid-cols-1'>
				<OwnedCourseCard>
					<Message>My custom message!</Message>
					<Button>Watch the course</Button>
				</OwnedCourseCard>
			</section>
		</>
	);
}

export default function PageInjections({ ...props }) {
	return (
		<BaseLayout>
			<OwnedCourses {...props} />
		</BaseLayout>
	);
}
