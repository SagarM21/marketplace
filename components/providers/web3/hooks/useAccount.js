import { useEffect, useState } from "react";
import useSWR from "swr";

const adminAddresses = {
	"0x6869f6d6fda46264d1b5140c73efa7d6e82c72a597c859480a40afa7622ce545": true,
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
			isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
			mutate,
			...rest,
		},
	};
};
