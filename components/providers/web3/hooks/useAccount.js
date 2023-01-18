import { useEffect, useState } from "react";
import useSWR from "swr";

const adminAddresses = {
	"0x6869f6d6fda46264d1b5140c73efa7d6e82c72a597c859480a40afa7622ce545": true,
	"0x2d423c095d29afc8421774f0e8049e235472d56be167d072939adc1479e3bdff": true,
};

export const handler = (web3, provider) => () => {
	const { data, mutate, ...rest } = useSWR(
		() => (web3 ? "web3/accounts" : null),

		async () => {
			const account = accounts[0];

			if (!account) {
				throw new Error(
					"Cannot retrieve an account, Please refresh the browser."
				);
			}

			return account;
		}
	);

	useEffect(() => {
		const mutator = (accounts) => mutate(accounts[0] ?? null);
		provider?.on("accountsChanged", mutator);

		return () => {
			provider?.removeListener("accountsChanged", mutator);
		};
	}, [provider]);
	return {
		data,
		isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
		mutate,
		...rest,
	};
};
