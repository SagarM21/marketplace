import { Navbar, Footer, Hero, BreadCrumbs } from "@components/common";
import { CourseList } from "@components/course";
import { OrderCard } from "@components/order";
import { EthRates, WalletBar } from "@components/web3";

export default function Home() {
	return (
		<div>
			<div className='relative bg-white overflow-hidden'>
				<div className='relative max-w-7xl mx-auto px-4'>
					<Navbar />
					<div className='fit'>
						<Hero />
						<BreadCrumbs />
						<WalletBar />
						<EthRates />
						<OrderCard />
						<CourseList />
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
}
