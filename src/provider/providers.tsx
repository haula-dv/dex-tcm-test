'use client'
import { OrderlyWalletProvider } from '@/components/OrderlyWalletProvider'
import { projectId, wagmiAdapter } from '@/config'
import { OrderlyAppProvider } from '@orderly.network/react-app'
import { arbitrum, mainnet, qTestnet } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

// Set up queryClient
const queryClient = new QueryClient()

if (!projectId) {
    throw new Error('Project ID is not defined')
}

// Set up metadata
const metadata = {
    name: 'appkit-example',
    description: 'AppKit Example',
    url: 'https://appkitexampleapp.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// Create the modal
createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: [mainnet, arbitrum, qTestnet],
    defaultNetwork: mainnet,
    metadata: metadata,
    features: {
        analytics: true // Optional - defaults to your Cloud configuration
    }
})

function Providers({ children, cookies }: { children: ReactNode; cookies: string | null }) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                <OrderlyWalletProvider>
                    <OrderlyAppProvider
                        brokerId="bazaarex"
                        brokerName="Bazaarex"
                        networkId="testnet"
                    >
                        {children}
                    </OrderlyAppProvider>
                </OrderlyWalletProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}

export default Providers


// 'use client';
// import { OrderlyWalletProvider } from '@/components/OrderlyWalletProvider';
// import { OrderlyAppProvider } from '@orderly.network/react-app';
// import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
// import { arbitrum, mainnet, qTestnet } from '@reown/appkit/networks';
// import { createAppKit } from '@reown/appkit/react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { WagmiProvider } from 'wagmi';

// const projectId = "8113e540d923482c1bc40bb5e4a14672"
// const queryClient = new QueryClient()

// const metadata = {
//     name: "Bazaarex",
//     description: "Bazaarex",
//     url: "https://bazaarex.com",
//     icons: ["https://bazaarex.com/favicon.ico"],
// }

// export function Providers({ children }: { children: React.ReactNode }) {
//     const chains: any = [mainnet, arbitrum, qTestnet]
//     const wagmiAdapter = new WagmiAdapter({
//         networks: chains,
//         projectId
//     })

//     createAppKit({
//         adapters: [wagmiAdapter],
//         networks: chains,
//         metadata: metadata,
//         projectId,
//         features: {
//             analytics: true,
//         }
//     })

//     return (
//         <WagmiProvider config={wagmiAdapter.wagmiConfig}>
//             <QueryClientProvider client={queryClient}>
//                 <OrderlyWalletProvider>
//                     <OrderlyAppProvider
//                         brokerId="bazaarex"
//                         brokerName="Bazaarex"
//                         networkId="testnet"
//                     >
//                         {children}
//                     </OrderlyAppProvider>
//                 </OrderlyWalletProvider>
//             </QueryClientProvider>
//         </WagmiProvider>
//     );
// }


// 'use client';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { OrderlyAppProvider } from '@orderly.network/react-app';
// ;
// // Add the following imports
// import { createAppKit } from '@reown/appkit/react'
// import { arbitrum, mainnet } from '@reown/appkit/networks'
// import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
// import { WagmiProvider } from 'wagmi'
// import { OrderlyProvider } from '@/components/OrderlyWalletProvider';

// const projectId = '0ac26472e99a923a4b08138e9171a30e'
// const queryClient = new QueryClient()

// const metadata = { //optional
//     name: 'AppKit',
//     description: 'AppKit Example',
//     url: 'https://example.com',
//     icons: ['https://avatars.githubusercontent.com/u/179229932']
// }

// export function Providers({ children }: { children: React.ReactNode }) {
//     const chains: any = [mainnet, arbitrum]
//     const wagmiAdapter = new WagmiAdapter({
//         networks: chains,
//         projectId
//     })

//     createAppKit({
//         adapters: [wagmiAdapter],
//         networks: chains,
//         metadata: metadata,
//         projectId,
//         features: {
//             analytics: true,
//         }
//     })

//     return (
//         <>
//             <WagmiProvider config={wagmiAdapter.wagmiConfig}>
//                 <QueryClientProvider client={queryClient}>
//                     <OrderlyAppProvider
//                         brokerId="orderly"
//                         brokerName="Orderly"
//                         networkId="testnet"
//                     >
//                         <OrderlyProvider>
//                             {children}
//                         </OrderlyProvider>
//                     </OrderlyAppProvider>
//                 </QueryClientProvider>
//             </WagmiProvider>
//         </>
//     );
// }
