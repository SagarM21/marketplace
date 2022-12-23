import { useEffect, useState } from "react";
import useSWR from "swr";

const adminAddresses = {
	"0x244ab81BDC4Fb548b8E39dc258e36d4E95C8fC4b": true,
};

export const handler = (web3, provider) => () => {
	const { data, mutate, ...rest } = useSWR(
		() => (web3 ? "web3/accounts" : null),

		async () => {
			const accounts = await web3.eth.getAccounts();
			return accounts[0];
		}
	);

	useEffect(() => {
		provider &&
			provider.on("accountsChanged", (accounts) => mutate(accounts[0] ?? null));
	}, [provider]);
	return {
		account: {
			data,
			isAdmin: (data && adminAddresses[data]) ?? false,
			mutate,
			...rest,
		},
	};
};
