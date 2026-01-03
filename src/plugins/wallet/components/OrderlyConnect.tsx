"use client";
import { MainButton } from "@/components/button/MainButton";
import { MainDialog } from "@/components/dialog/MainDialog";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useAccount } from "@orderly.network/hooks";
import { AccountStatusEnum } from "@orderly.network/types";
import { IconCheck } from "@tabler/icons-react";
import { useNotifications, useSetChain } from "@web3-onboard/react";
import { useEffect, useRef, useState } from "react";

let timer: number | undefined;

export const OrderlyConnect = () => {
	const [open, setOpen] = useState(false);
	const { account, state, createOrderlyKey } = useAccount();
	const [{ connectedChain }] = useSetChain();
	const [_, customNotification] = useNotifications();

	// Track pending operations for mobile wallet recovery
	const pendingOperationRef = useRef<{ type: 'register' | 'key' | null, update?: any }>({ type: null });
	const previousStatusRef = useRef(state.status);

	useEffect(() => {
		if (!connectedChain) return;
		account.switchChainId(connectedChain.id);
	}, [connectedChain, account]);

	// Detect when user returns from MetaMask app and check if operation succeeded
	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.visibilityState === 'visible' && pendingOperationRef.current.type) {
				// Wait a bit for state to update after returning to page
				setTimeout(() => {
					const hasOrderlyKey = state.status >= AccountStatusEnum.EnableTrading;
					const isRegistered = state.status >= AccountStatusEnum.SignedIn;

					// Check if key creation succeeded while we were away
					if (pendingOperationRef.current.type === 'key' && hasOrderlyKey) {
						console.log('Orderly key creation succeeded on mobile');
						if (pendingOperationRef.current.update) {
							pendingOperationRef.current.update({
								eventCode: 'orderlyKeySuccess',
								type: 'success',
								message: 'Key registration complete!',
								autoDismiss: 5_000
							});
						}
						pendingOperationRef.current = { type: null };
					}
					// Check if registration succeeded while we were away
					else if (pendingOperationRef.current.type === 'register' && isRegistered) {
						console.log('Orderly registration succeeded on mobile');
						if (pendingOperationRef.current.update) {
							pendingOperationRef.current.update({
								eventCode: 'registerSuccess',
								type: 'success',
								message: 'Registration complete!',
								autoDismiss: 5_000
							});
						}
						pendingOperationRef.current = { type: null };
					}
				}, 1000);
			}
		};

		document.addEventListener('visibilitychange', handleVisibilityChange);
		return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
	}, [state.status]);

	// Auto-clear pending operations if status changes externally
	useEffect(() => {
		if (previousStatusRef.current !== state.status) {
			const hasOrderlyKey = state.status >= AccountStatusEnum.EnableTrading;
			const isRegistered = state.status >= AccountStatusEnum.SignedIn;

			// Clear pending operation if status changed to success
			if (pendingOperationRef.current.type === 'key' && hasOrderlyKey) {
				pendingOperationRef.current = { type: null };
			} else if (pendingOperationRef.current.type === 'register' && isRegistered) {
				pendingOperationRef.current = { type: null };
			}

			previousStatusRef.current = state.status;
		}
	}, [state.status]);


	// Auto-open dialog when wallet connected but not fully set up
	useEffect(() => {
		if (timer != null) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			if (state.status < AccountStatusEnum.EnableTrading && account.address != null) {
				setOpen(true);
				timer = undefined;
			}
		}, 3_000) as unknown as number;
	}, [state, setOpen, account]);

	// Handle Register Account
	const handleRegisterAccount = async () => {
		const { update } = customNotification({
			eventCode: "register",
			type: "pending",
			message: "Registering account...",
		});

		// Store for mobile wallet recovery
		pendingOperationRef.current = { type: 'register', update };

		try {
			await account.createAccount();
			pendingOperationRef.current = { type: null };
			update({
				eventCode: "registerSuccess",
				type: "success",
				message: "Registration complete!",
				autoDismiss: 5_000,
			});
		} catch (err) {
			console.error(err);
			pendingOperationRef.current = { type: null };
			update({
				eventCode: "registerError",
				type: "error",
				message: "Registration failed!",
				autoDismiss: 5_000,
			});
			throw err;
		}
	};

	const isRegistered = state.status >= AccountStatusEnum.SignedIn;
	const hasOrderlyKey = state.status >= AccountStatusEnum.EnableTrading;

	// Handle Create Orderly Key
	const handleCreateOrderlyKey = async () => {
		const { update } = customNotification({
			eventCode: 'orderlyKey',
			type: 'pending',
			message: 'Registering Orderly key...'
		});

		// Store for mobile wallet recovery
		pendingOperationRef.current = { type: 'key', update };

		try {
			// Use createOrderlyKey from useAccount hook - true means remember/persist key
			// On mobile, this might redirect to MetaMask app and the promise may not resolve

			// Create a promise race with timeout for better UX on mobile
			const keyPromise = account.createOrderlyKey(365)
			const timeoutPromise = new Promise((_, reject) => {
				setTimeout(() => {
					reject(new Error('Request timeout - please check your wallet app'));
				}, 60000); // 60 second timeout
			});

			// Race between key creation and timeout
			await Promise.race([keyPromise, timeoutPromise]);

			pendingOperationRef.current = { type: null };

			update({
				eventCode: 'orderlyKeySuccess',
				type: 'success',
				message: 'Key registration complete!',
				autoDismiss: 5_000
			});
		} catch (err) {
			console.error("createOrderlyKey error:", err);
			pendingOperationRef.current = { type: null };

			const errorMessage = err instanceof Error
				? err.message
				: 'Key registration failed!';

			// Provide helpful message for timeout
			const displayMessage = errorMessage.includes('timeout')
				? 'Request timed out. Please open your MetaMask app and approve the transaction.'
				: errorMessage;

			update({
				eventCode: 'orderlyKeyError',
				type: 'error',
				message: displayMessage,
				autoDismiss: 8_000 // Longer display for error messages
			});
		}
	};

	return (
		<MainDialog
			open={open}
			handleClose={() => {
				// Only allow close if fully set up
				if (isRegistered && hasOrderlyKey) {
					setOpen(false);
				}
			}}
			title="Connect with Orderly Network"
			maxWidth="sm"
			isDivider
		>
			<Stack spacing={3}>
				{/* Step 1: Register Account */}
				<Box>
					<Typography variant="body2" mb={2} color="text.secondary">
						Step 1: Register your account on Orderly Network
					</Typography>
					<MainButton
						fullWidth
						variant={isRegistered ? "outlined" : "contained"}
						color={isRegistered ? "success" : "primary"}
						disabled={isRegistered}
						onClick={handleRegisterAccount}
						startIcon={isRegistered ? <IconCheck size={20} /> : null}
					>
						{isRegistered ? "Account Registered ✓" : "Register Account"}
					</MainButton>
				</Box>

				<Divider />

				{/* Step 2: Create Orderly Key */}
				<Box>
					<Typography variant="body2" mb={2} color="text.secondary">
						Step 2: Create a trading key pair. It will be stored in your browser&apos;s local
						storage and is unique per device.
					</Typography>
					<MainButton
						fullWidth
						variant={hasOrderlyKey ? "outlined" : "contained"}
						color={hasOrderlyKey ? "success" : "primary"}
						disabled={hasOrderlyKey || !isRegistered}
						onClick={handleCreateOrderlyKey}
						startIcon={hasOrderlyKey ? <IconCheck size={20} /> : null}
					>
						{hasOrderlyKey ? "Trading Key Created ✓" : "Create Trading Key"}
					</MainButton>
				</Box>

				{/* Done message */}
				{isRegistered && hasOrderlyKey && (
					<>
						<Divider />
						<Box textAlign="center">
							<Typography variant="body1" color="success.main" fontWeight={600}>
								All set! You can now start trading 🎉
							</Typography>
							<MainButton
								fullWidth
								variant="outlined"
								color="primary"
								onClick={() => setOpen(false)}
								sx={{ mt: 2 }}
							>
								Close
							</MainButton>
						</Box>
					</>
				)}
			</Stack>
		</MainDialog>
	);
};
