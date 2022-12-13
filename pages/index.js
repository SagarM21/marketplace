import { Hero, BreadCrumbs } from "@components/common";
import { CourseList } from "@components/course";
import { BaseLayout } from "@components/layout";
import { OrderCard } from "@components/order";
import { EthRates, WalletBar } from "@components/web3";

export default function Home() {
	return (
		<BaseLayout>
			<Hero />
			<BreadCrumbs />
			<WalletBar />
			<EthRates />
			<OrderCard />
			<CourseList />
		</BaseLayout>
	);
}
