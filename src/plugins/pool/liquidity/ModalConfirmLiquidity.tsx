import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { MainDialog } from '@/components/dialog/MainDialog';
import { TokenIcon } from '@/components/token/TokenIcon';
import { ItemRow } from '@/plugins/pool/components/TokenSelected';
import { theme } from '@/utils';
import { Divider, Stack, Typography } from '@mui/material';

interface IProps {
	open: boolean;
	onClose: () => void;
}

export const ModalConfirmLiquidity = ({ onClose, open }: IProps) => {
	return (
		<MainDialog open={open} handleClose={onClose} maxWidth="xs" title="You will Receice">
			<Stack spacing={2}>
				<ItemRow
					title="0.00000014309"
					value={
						<Stack direction={'row'} spacing={1} alignItems={'center'}>
							<Typography fontWeight={600} fontSize={'15px'}>
								ETH
							</Typography>
							<TokenIcon url="/images/token.png" size={20} />
						</Stack>
					}
				/>

				<ItemRow
					title="0.000140418"
					value={
						<Stack direction={'row'} spacing={1} alignItems={'center'}>
							<Typography fontWeight={600} fontSize={'15px'}>
								BNB
							</Typography>
							<TokenIcon url="/images/token.png" size={20} />
						</Stack>
					}
				/>

				<Typography color={theme.palette.grey[400]}>
					You are the first liquidity provider You are the first liquidity provider You are the first liquidity provider
					You are the first liquidity provider You are the first liquidity
				</Typography>

				<Stack>
					<Typography mb="6px" fontSize={'16px'} fontWeight={600}>
						Deva ETH/BNB
					</Typography>

					<MainCard backgroudColor="white" width="100%" disablePadding>
						<Stack spacing={1} p={2}>
							<ItemRow
								title="UNI ETH/BNB"
								value={
									<Stack direction={'row'} alignItems={'center'} spacing={0.5}>
										<Typography fontSize={'15px'}>0.0000000000430254</Typography>
										<TokenIcon url="/images/token.png" size={20} />
										<TokenIcon url="/images/token.png" size={20} />
									</Stack>
								}
							/>

							<ItemRow title="Bured" value="" />
						</Stack>

						<Divider />

						<Stack spacing={1} p={2}>
							<ItemRow
								title="Price"
								value={
									<Typography color={theme.palette.grey[500]} fontSize={'15px'}>
										1 ETH = 981.33 BNB
									</Typography>
								}
							/>

							<ItemRow
								title=""
								value={
									<Typography color={theme.palette.grey[500]} fontSize={'15px'}>
										1 ETH = 981.33 BNB
									</Typography>
								}
							/>
						</Stack>
					</MainCard>
				</Stack>

				<MainButton variant="contained" color="darkGrey" onClick={onClose} size="large">
					Confirm
				</MainButton>
			</Stack>
		</MainDialog>
	);
};
