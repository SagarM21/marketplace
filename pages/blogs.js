import { BaseLayout } from "@components/ui/layout";
import React from "react";

function Blogs() {
	return (
		<>
			<div className='flex justify-center items-center text-black font-medium text-2xl mt-24'>
				In progress
			</div>
		</>
	);
}

export default function PageInjections({ ...props }) {
	return (
		<BaseLayout>
			<Blogs {...props} />
		</BaseLayout>
	);
}
