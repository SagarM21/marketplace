import { handler as createUseAccount } from "./useAccount";

export const setupHooks = (...deps) => {
	return {
		useAccount: createUseAccount(...deps),
	};
};

// more than 1 param, send ...deps