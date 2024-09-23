import { ITab } from '@/common/types/components/tab';
import { MainDialog } from '@/components/dialog/MainDialog';
import Logo from '@/components/icons/Logo';
import MainTab from '@/components/tab/MainTab';
import { ItemRow } from '@/plugins/pool/components/TokenSelected';
import DividerOrder from '@/plugins/trade/components/create-order/DividerOrder';
import { setColorThemeMode } from '@/utils/helpers';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import TabPanel from '@mui/lab/TabPanel';
import { Box, InputBase, Stack, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useWithdraw } from '@orderly.network/hooks';
import { WalletState } from '@orderly.network/hooks/esm/walletConnectorContext';
import { IconArrowDown } from '@tabler/icons-react';
import { FixedNumber } from 'ethers';
import Image from 'next/image';

interface IProps {
	open: boolean;
	onClose: () => void;
	walletBalance: FixedNumber;
	orderlyBalance: FixedNumber;
	withdraw: ReturnType<typeof useWithdraw>['withdraw'];
	wallet: WalletState;
}

const tabs: ITab[] = [
	{ label: 'Deposit', value: 'deposit' },
	{ label: 'Withdraw', value: 'withdraw' },
];

export const DepositWithdrawDialog = ({ open, onClose, wallet, walletBalance, orderlyBalance }: IProps) => {
	const theme = useTheme();

	return (
		<MainDialog open={open} handleClose={onClose} maxWidth="xs" title="Deposit / Withdraw" isDivider>
			<MainTab tabs={tabs}>
				<>
					<TabPanel value="deposit" sx={{ p: 0 }}>
						<ItemRow
							title="Your web3 wallet"
							value={<>{wallet && <Image src={wallet.icon} height={20} width={20} alt="" />}</>}
						/>

						<CustomField>
							<Stack>
								<Stack direction={'row'}>
									<InputBase placeholder="Quantity" sx={{ width: '100%' }} />

									<Stack direction={'row'} alignItems={'center'} spacing={'6px'} pr="10px" flexShrink={0}>
										<Image src={'/images/USDC.png'} height={20} width={20} alt="" />
										<Typography fontWeight={600}>USDC</Typography>
									</Stack>
								</Stack>

								<Stack direction={'row'} justifyContent={'space-between'}>
									<Typography
										fontSize={'12px'}
										color={setColorThemeMode(theme.palette.grey[900], theme.palette.grey[300])}
									>
										$0
									</Typography>

									<Typography
										fontSize={'12px'}
										color={setColorThemeMode(theme.palette.grey[900], theme.palette.grey[300])}
									>
										Availabe: {walletBalance.toString()} USDC
									</Typography>
								</Stack>
							</Stack>
						</CustomField>

						<Box py={'4px'} />

						<DividerOrder>
							<IconArrowDown size={'1rem'} />
						</DividerOrder>

						<Box py={'4px'} />

						<ItemRow title="Your Tcmp Dex Trande account" value={<Logo height={44} width={44} />} />
					</TabPanel>

					<TabPanel value="withdraw" sx={{ p: 0 }}>
						12344
					</TabPanel>
				</>
			</MainTab>
		</MainDialog>
	);
};

const CustomField = styled(Box)(({ theme }) => ({
	border: `1px solid ${theme.palette.grey[600]}`,
	padding: `2px ${TSizes.margin_common} ${TSizes.margin_common} ${TSizes.margin_common}`,
	borderRadius: TSizes.borderRadius,
	marginTop: '10px',
	backgroundColor: setColorThemeMode(theme.palette.grey[100], theme.palette.grey[700]),
	transition: '0.6s',

	'&:focus-within': {
		borderColor: setColorThemeMode(theme.palette.grey[200], theme.palette.grey[500]),
	},

	'& .MuiInputBase-input': {
		width: '100%',
	},
}));
