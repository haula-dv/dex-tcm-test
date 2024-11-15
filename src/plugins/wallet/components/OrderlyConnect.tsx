"use client";
import { useAccount } from "@orderly.network/hooks";
import { AccountStatusEnum } from "@orderly.network/types";
import { useConnectWallet, useNotifications, useSetChain } from "@web3-onboard/react";
import { useEffect } from "react";

let timer: number | undefined;

export const OrderlyConnect = () => {
	const [{ wallet }] = useConnectWallet();

	const { account, state } = useAccount();
	const [{ connectedChain }] = useSetChain();

	const [_, customNotification] = useNotifications();

	useEffect(() => {
		if (!connectedChain) return;
		account.switchChainId(connectedChain.id);
	}, [connectedChain, account]);

	const isRegistered = state.status >= AccountStatusEnum.SignedIn;
	const hasOrderlyKey = state.status >= AccountStatusEnum.EnableTrading;

	// Handle Register Account
	const handleRegisterAccount = async () => {
		const { update } = customNotification({
			eventCode: "register",
			type: "pending",
			message: "Registering account...",
		});
		try {
			await account.createAccount();
			update({
				eventCode: "registerSuccess",
				type: "success",
				message: "Registration complete!",
				autoDismiss: 5_000,
			});
		} catch (err) {
			console.error(err);
			update({
				eventCode: "registerError",
				type: "error",
				message: "Registration failed!",
				autoDismiss: 5_000,
			});
			throw err;
		}
	};

	const handleOrderkyKey = async () => {
		const { update } = customNotification({
			eventCode: "orderlyKey",
			type: "pending",
			message: "Registering Orderly key...",
		});
		try {
			await account.createOrderlyKey(365);
			update({
				eventCode: "orderlyKeySuccess",
				type: "success",
				message: "Key registration complete!",
				autoDismiss: 5_000,
			});
		} catch (err) {
			console.error(err);
			update({
				eventCode: "orderlyKeyError",
				type: "error",
				message: "Key registration failed!",
				autoDismiss: 5_000,
			});
			throw err;
		}
	};

	useEffect(() => {
		if (timer != null) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			if (state.status < AccountStatusEnum.EnableTrading && wallet != null) {
				if (!isRegistered) {
					handleRegisterAccount();
				}

				if (!hasOrderlyKey && state.status >= AccountStatusEnum.SignedIn) {
					handleOrderkyKey();
				}

				timer = undefined;
			}
		}, 3_000) as unknown as number;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	return <></>;
};
