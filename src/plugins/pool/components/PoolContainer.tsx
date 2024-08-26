'use client';
import { MainButton } from '@/components/button/MainButton';
import { MainCard } from '@/components/card/MainCard';
import { TSizes } from '@/utils/themes/custom-theme/sizes';
import { Box, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { AccountAnalystic } from './AccountAnalystic';
import { TokenSelected } from './TokenSelected';

export const PoolContainer = () => {
	return (
		<Box maxWidth={TSizes.widthCommonCard} mx="auto" pt={4}>
			<Stack spacing={2} alignItems={'center'} width={'100%'}>
				<MainCard backgroudColor="white" variant="outlined" width="100%">
					<Typography fontSize={'18px'} fontWeight={600} pb={1}>
						Liquidity provider rewards
					</Typography>

					<Typography>
						A token contract address is a unique address that represents a token on the blockchain. A token contract
						address is a unique address that represents a token on the blockchain.
					</Typography>
				</MainCard>

				<MainCard backgroudColor="primary" width="100%">
					<Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} pb={2}>
						<Typography fontSize={'18px'} fontWeight={600}>
							Liquidity
						</Typography>

						<Stack direction={'row'} maxWidth={'300px'} spacing={2}>
							<Link href={'/pool/create-a-pair'}>
								<MainButton variant="outlined" color="darkGrey" borderWidth="2px" size="large">
									Create A Pair
								</MainButton>
							</Link>

							<Link href={'/pool/add'}>
								<MainButton variant="contained" color="darkGrey" size="large">
									Add Liquidity
								</MainButton>
							</Link>
						</Stack>
					</Stack>

					<MainCard isHover variant="outlined" width="100%" backgroudColor="darkgrey">
						<Typography textAlign={'center'} color={'#fff'}>
							Your active V3 liquidity positions will appear here.
						</Typography>
					</MainCard>

					<Box pt={2} />
					<AccountAnalystic />
					<Box pt={2} />
					<TokenSelected />

					<Stack direction={'row'} spacing={2} justifyContent={'center'} pt={2} alignItems={'center'}>
						<Typography>{"Don't"} see a pool you joined?</Typography>
						<MainButton variant="textLink" color="inherit">
							Import It
						</MainButton>
					</Stack>
				</MainCard>
			</Stack>
		</Box>
	);
};
