import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createClient, configureChains, WagmiConfig } from 'wagmi'
import { goerli, hardhat } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { NextUIProvider } from '@nextui-org/react'
import { theme } from '../constant/config'
import { alchemyProvider } from 'wagmi/providers/alchemy'

const { provider, webSocketProvider, chains } = configureChains(
  [hardhat],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID ?? '' }),
    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'Salus Mint',
  chains,
})

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
  connectors,
})

// const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
//   return ensImage ? (
//     <img
//       src={ensImage}
//       width={size}
//       height={size}
//       style={{ borderRadius: 999 }}
//     />
//   ) : (
//     <img
//       src={'/logo.png'}
//       width={size}
//       height={size}
//       style={{ borderRadius: 999 }}
//     />
//   )
// }

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout ?? ((page: any) => page)

  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <NextUIProvider theme={theme}>
          <div className="relative w-full">
            {(Component as any).Layout ? (
              // Need default layout
              <Layout pageProps={pageProps}>
                <Component {...pageProps} />
              </Layout>
            ) : (
              <Component {...pageProps} />
            )}
          </div>
        </NextUIProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
