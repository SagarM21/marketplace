import { useWeb3 } from "@components/providers";
import Link from "next/link";
import { Button } from "@components/ui/common";
import { useAccount } from "@components/hooks/web3";
import { useRouter } from "next/router";

export default function Navbar() {
	const { connect, isLoading, isWeb3Loaded } = useWeb3();
	const { account } = useAccount();
	const { pathname } = useRouter();

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
							<Link href='/marketplace' legacyBehavior>
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
								account.data ? (
									<Button className='cursor-default' hoverable={false}>
										Hi There {account.isAdmin ? "Admin" : ""}
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
			{account.data && !pathname.includes("/marketplace") && (
				<div className='flex justify-end sm:px-6 lg:px-8 pt-1'>
					<div className='text-white bg-indigo-600 rounded-md p-2'>
						{account.data}
					</div>
				</div>
			)}
		</section>
	);
}
