"use client";
import { MainDialog } from "@/components/dialog/MainDialog";
import { useAccount } from "@orderly.network/hooks";
import { AccountStatusEnum } from "@orderly.network/types";
import { WalletConnectorWidget } from "@orderly.network/ui-connector";
import { useSetChain } from "@web3-onboard/react";
import { useEffect, useState } from "react";

let timer: number | undefined;

export const OrderlyConnect = () => {
	const [open, setOpen] = useState(false);
	const { account, state } = useAccount();
	const [{ connectedChain }] = useSetChain();

	useEffect(() => {
		if (!connectedChain) return;
		account.switchChainId(connectedChain.id);
	}, [connectedChain, account]);

	const isRegistered = state.status >= AccountStatusEnum.SignedIn;
	const hasOrderlyKey = state.status >= AccountStatusEnum.EnableTrading;

	// Export function to open modal manually
	const openModal = () => setOpen(true);

	useEffect(() => {
		if (hasOrderlyKey) {
			setOpen(false);
		}

		if (isRegistered && !hasOrderlyKey) {
			setOpen(true);
		}
	}, [hasOrderlyKey, isRegistered])

	return {
		modal: (
			<MainDialog
				open={open}
				handleClose={() => {
					setOpen(false);
				}}
				title="Connect with Orderly Network"
				maxWidth="xs"
				isDivider
			>
				<WalletConnectorWidget />
			</MainDialog>
		),
		openModal,
		hasOrderlyKey,
		isRegistered
	}

	// return {
	// 	modal: (
	// 		<MainDialog
	// 			open={open}
	// 			handleClose={() => {
	// 				// Only allow close if fully set up
	// 				if (isRegistered && hasOrderlyKey) {
	// 					setOpen(false);
	// 				}
	// 			}}
	// 			title="Connect with Orderly Network"
	// 			maxWidth="xs"
	// 			isDivider
	// 		>
	// 			<Stack spacing={3}>
	// 				{/* Step 1: Register Account */}
	// 				<Box>
	// 					<Typography variant="body2" mb={2} color="text.secondary">
	// 						Step 1: Register your account on Orderly Network
	// 					</Typography>
	// 					<MainButton
	// 						fullWidth
	// 						variant={isRegistered ? "outlined" : "contained"}
	// 						color={isRegistered ? "success" : "primary"}
	// 						disabled={isRegistered}
	// 						onClick={async () => {
	// 							const { update } = customNotification({
	// 								eventCode: 'register',
	// 								type: 'pending',
	// 								message: 'Registering account...'
	// 							});
	// 							try {
	// 								await account.createAccount();
	// 								update({
	// 									eventCode: 'registerSuccess',
	// 									type: 'success',
	// 									message: 'Registration complete!',
	// 									autoDismiss: 5_000
	// 								});
	// 							} catch (err) {
	// 								console.error(err);
	// 								update({
	// 									eventCode: 'registerError',
	// 									type: 'error',
	// 									message: 'Registration failed!',
	// 									autoDismiss: 5_000
	// 								});
	// 								throw err;
	// 							}
	// 						}}
	// 						startIcon={isRegistered ? <IconCheck size={20} /> : null}
	// 					>
	// 						{isRegistered ? "Account Registered ✓" : "Register Account"}
	// 					</MainButton>
	// 				</Box>

	// 				<Divider />

	// 				{/* Step 2: Create Orderly Key */}
	// 				<Box>
	// 					<Typography variant="body2" mb={2} color="text.secondary">
	// 						Step 2: Create a trading key pair. It will be stored in your browser&apos;s local
	// 						storage and is unique per device.
	// 					</Typography>
	// 					<PendingButton
	// 						disabled={hasOrderlyKey || !isRegistered}
	// 						onClick={async () => {
	// 							const { update } = customNotification({
	// 								eventCode: 'orderlyKey',
	// 								type: 'pending',
	// 								message: 'Registering Orderly key...'
	// 							});
	// 							try {
	// 								await account.createOrderlyKey(365);
	// 								update({
	// 									eventCode: 'orderlyKeySuccess',
	// 									type: 'success',
	// 									message: 'Key registration complete!',
	// 									autoDismiss: 5_000
	// 								});

	// 							} catch (err) {
	// 								console.error(err);
	// 								update({
	// 									eventCode: 'orderlyKeyError',
	// 									type: 'error',
	// 									message: 'Key registration failed!',
	// 									autoDismiss: 5_000
	// 								});
	// 								throw err;
	// 							} finally {
	// 								setOpen(false);
	// 							}
	// 						}}
	// 					>
	// 						{hasOrderlyKey ? "Trading Key Created ✓" : "Create Trading Key"}
	// 					</PendingButton>
	// 				</Box>

	// 				{/* Done message */}
	// 				{isRegistered && hasOrderlyKey && (
	// 					<>
	// 						<Divider />
	// 						<Box textAlign="center">
	// 							<Typography variant="body1" color="success.main" fontWeight={600}>
	// 								All set! You can now start trading 🎉
	// 							</Typography>
	// 							<MainButton
	// 								fullWidth
	// 								variant="outlined"
	// 								color="primary"
	// 								onClick={() => setOpen(false)}
	// 								sx={{ mt: 2 }}
	// 							>
	// 								Close
	// 							</MainButton>
	// 						</Box>
	// 					</>
	// 				)}
	// 			</Stack>
	// 		</MainDialog>
	// 	),
	// 	openModal,
	// 	hasOrderlyKey,
	// 	isRegistered,
	// };
};
