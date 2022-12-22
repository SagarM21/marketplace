import { useWeb3 } from "@components/providers";
import Link from "next/link";
import { Button } from "@components/ui/common";
import { useAccount } from "@components/web3/hooks/useAccount";

export default function Navbar() {
	const { connect, isLoading, isWeb3Loaded } = useWeb3();
	const { account } = useAccount();

	return (
		<section>
			<div className='relative pt-6 px-4 sm:px-6 lg:px-8'>
				<nav className='relative' aria-label='Global'>
					<div className='flex justify-between items-center'>
						<div>
							<Link href='/' legacyBehavior>
								<a className='font-medium mr-8 text-gray-500 hover:text-gray-900'>
									Home
								</a>
							</Link>
							<Link href='/' legacyBehavior>
								<a className='font-medium mr-8 text-gray-500 hover:text-gray-900'>
									Marketplace
								</a>
							</Link>
							<Link href='/' legacyBehavior>
								<a className='font-medium mr-8 text-gray-500 hover:text-gray-900'>
									Blogs
								</a>
							</Link>
						</div>
						<div>
							<Link href='/' legacyBehavior>
								<a className='font-medium mr-8 text-gray-500 hover:text-gray-900'>
									Wishlist
								</a>
							</Link>
							{isLoading ? (
								<Button onClick={connect} disabled={true}>
									Connecting
								</Button>
							) : isWeb3Loaded ? (
								account ? (
									<Button className='cursor-default' hoverable={false}>
										Hi There
									</Button>
								) : (
									<Button onClick={connect}>Connect</Button>
								)
							) : (
								<Button
									onClick={() =>
										window.open("https://metamask.io/download/", "_blank")
									}
								>
									Install Metamask
								</Button>
							)}
						</div>
					</div>
				</nav>
			</div>
		</section>
	);
}
