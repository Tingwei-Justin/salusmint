import React, { useState } from 'react'
import Layout from '@components/Layout'
import dynamic from 'next/dynamic'
import { Badge, Card, Grid, Row } from '@nextui-org/react'
import BorrowSection from '@components/Borrow/BorrowSection'
import BurnSection from '@components/Burn/BurnSection'
import Marquee from 'react-fast-marquee'
import Image from 'next/image'
import Link from 'next/link'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import clsx from 'clsx'

const HealthIndicatorChart = dynamic(
  () => import('@components/Chart/HealthIndicatorChart'),
  {
    ssr: false,
  }
)

const NFTVaultChart = dynamic(() => import('@components/Chart/NFTVaultChart'), {
  ssr: false,
})

const defaultTabs = [
  { name: 'Overview', href: 'overview', current: true },
  { name: 'Creator', href: 'creator', current: false },
  { name: 'Holder', href: 'holder', current: false },
]
const data = [
  {
    name: '2022-06-02',
    uv: 1000,
  },
  {
    name: '2022-07-02',
    uv: 1010,
  },
  {
    name: '2022-08-02',
    uv: 1023,
  },
  {
    name: '2022-09-02',
    uv: 1037,
  },
  {
    name: '2022-10-02',
    uv: 1044,
  },
  {
    name: '2022-11-02',
    uv: 1050,
  },
  {
    name: '2022-12-02',
    uv: 1062,
  },
]

function CollectionPage() {
  const router = useRouter()
  const { id: nftAddress, vaultAddress } = router.query
  const [tabs, setTabs] = useState(defaultTabs)

  async function onHandleTab(idx: number) {
    const newTabs = [...tabs]
    for (let i = 0; i < newTabs.length; ++i) {
      newTabs[i].current = i === idx
    }
    setTabs(newTabs)

    router.push(
      `/collection/${nftAddress}?vaultAddress=${vaultAddress}&tab=${defaultTabs[idx].href}`,
      undefined,
      {
        shallow: true,
      }
    )
  }

  return (
    <div className="w-full">
      {/* banner */}
      <div className="relative h-80 overflow-hidden">
        <Image
          src="/demo-collection/banner.png"
          alt="banner"
          className="object-contain"
          width={2000}
          height={500}
        />
      </div>
      <div className="px-8">
        {/* Collection description */}
        <div className="relative -top-20 flex w-full gap-8">
          <div className="">
            <Image
              src="/demo-collection/Group 1.png"
              className=" rounded-lg object-contain"
              width={260}
              height={260}
              alt="icon"
            />
          </div>
          <div className="self-end">
            <div>
              <div className="text-5xl font-bold">BAYC Denver DEMO</div>
              <div className="mt-4 max-w-3xl opacity-60">
                SalusMint is the next generation of no code NFT launched
                platform fully backed by Blue chip DeFi to prevent creators from
                cashing out all their sale proceeds at once and to foster a
                thriving community focused on health.
              </div>
            </div>
          </div>
        </div>

        {/* Tab */}
        <div className="w-full border-b-[1px] border-black border-opacity-10 py-4 pb-2">
          {tabs.map((tab, idx) => (
            <a
              key={tab.name}
              onClick={() => {
                onHandleTab(idx)
              }}
              className={clsx(
                ' whitespace-nowrap border-b-[3px] py-2 px-4 tracking-wide text-black hover:cursor-pointer',
                tab.current
                  ? 'border-black font-bold'
                  : 'border-transparent opacity-60 hover:opacity-80'
              )}
              aria-current={tab.current ? 'page' : undefined}
            >
              <span>{tab.name}</span>
            </a>
          ))}
        </div>

        <div className="flex w-full items-center justify-between">
          <Grid.Container gap={2} justify="flex-start">
            {[...Array(8)].map((_, index) => (
              <Grid xs={6} sm={3} key={index}>
                <Card isPressable>
                  <Card.Body css={{ p: 0 }}>
                    <Card.Image
                      src={`/demo-collection/Group ${index + 1}.png`}
                      objectFit="fill"
                      width={'100%'}
                      height={'100%'}
                      alt={'img'}
                    />
                  </Card.Body>
                  <Card.Footer css={{ justifyItems: 'flex-start' }}>
                    <Row wrap="wrap" justify="space-between" align="center">
                      <div>{index}</div>
                    </Row>
                  </Card.Footer>
                </Card>
              </Grid>
            ))}
          </Grid.Container>
          <div className="h-full w-1/4 items-center bg-black">
            <button
              // onClick={mint}
              className="flex h-60 w-full items-center justify-center py-2 text-3xl font-bold text-white  hover:scale-105 hover:cursor-pointer"
            >
              MINT NOW
            </button>
          </div>
        </div>
        {/* NFT Vault */}
        <div className="w-full pt-10">
          <div className="text-4xl font-semibold tracking-wider">
            NFT DAO Vault
          </div>
          <div className="mt-8 flex h-[50vh] w-full gap-6">
            <div className="w-1/3">
              <Card css={{ mw: '100%' }}>
                <Card.Body>
                  <div className="flex w-full flex-col gap-8 px-4">
                    <div className="flex w-full items-center gap-2 text-lg">
                      <div className="font-bold tracking-wide">
                        Yield strategy:{' '}
                      </div>
                      <div>STETH (Lido - Ethereum) </div>
                    </div>

                    <div className="">
                      <div className="text-sm font-bold opacity-80">
                        Total APY
                      </div>
                      <div className="text-5xl font-bold">5.20%</div>
                    </div>

                    <div className="text-sm opacity-80">
                      <div className="font-bold">Outlook</div>
                      <div className="opacity-60">
                        The algorithm predicts the current APY of 5.20% to fall
                        below 4.16% within the next 4 weeks. Confidence: Low
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="h-full w-2/3">
              <NFTVaultChart data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CollectionPage

CollectionPage.Layout = Layout
