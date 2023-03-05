import React, { useEffect, useState } from 'react'
import Layout from '@components/Layout'
import dynamic from 'next/dynamic'
import { Badge, Button, Card, Grid, Row } from '@nextui-org/react'
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
  {
    name: '2023-1-02',
    uv: 1075,
  },
  {
    name: '2023-2-02',
    uv: 1090,
  },
  {
    name: '2023-3-02',
    uv: 1105,
  },
]

function CollectionPage() {
  const router = useRouter()
  const { id: nftAddress, vaultAddress } = router.query
  const [tabs, setTabs] = useState(defaultTabs)
  const [displayType, setDisplayType] = useState(defaultTabs[0].href)

  useEffect(() => {
    const { tab } = router.query
    if (!tab || tab === defaultTabs[0].href) {
      setDisplayType(defaultTabs[0].href)
      updateActiveTab(0)
    } else if (tab === defaultTabs[1].href) {
      setDisplayType(defaultTabs[1].href)
      updateActiveTab(1)
    } else if (tab === defaultTabs[2].href) {
      setDisplayType(defaultTabs[2].href)
      updateActiveTab(2)
    } else {
      setDisplayType(defaultTabs[0].href)
      updateActiveTab(0)
    }
  }, [router.query])

  function updateActiveTab(idx: number) {
    const newTabs = [...tabs]
    for (let i = 0; i < newTabs.length; ++i) {
      newTabs[i].current = i === idx
    }
    setTabs(newTabs)
  }
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
              width={300}
              height={300}
              alt="icon"
            />
          </div>
          <div className="flex w-full justify-between self-end">
            <div>
              <div className="text-5xl font-bold">BAYC Denver DEMO</div>
              <div className="mt-4 max-w-3xl opacity-60">
                SalusMint is the next generation of no code NFT launched
                platform fully backed by Blue chip DeFi to prevent creators from
                cashing out all their sale proceeds at once and to foster a
                thriving community focused on health.
              </div>
            </div>
            <div className="pt-10">
              <Link
                className="p-4 text-black"
                href={`/collection/${nftAddress}/mint?vaultAddress=${vaultAddress}`}
              >
                <button className="flex w-64 items-center justify-center border border-white bg-black py-2 text-3xl  font-bold text-white hover:scale-105 hover:cursor-pointer">
                  MINT NOW
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Tab */}
        <div className="w-full border-b-[1px] border-white border-opacity-10 py-4 pb-2">
          {tabs.map((tab, idx) => (
            <a
              key={tab.name}
              onClick={() => {
                onHandleTab(idx)
              }}
              className={clsx(
                ' whitespace-nowrap border-b-[3px] py-2 px-4 tracking-wide text-white hover:cursor-pointer',
                tab.current
                  ? 'border-white font-bold'
                  : 'border-transparent opacity-60 hover:opacity-80'
              )}
              aria-current={tab.current ? 'page' : undefined}
            >
              <span>{tab.name}</span>
            </a>
          ))}
        </div>

        {displayType === defaultTabs[0].href && (
          <div className="w-full">
            <div className="flex w-full items-center justify-between">
              <Grid.Container gap={2} justify="flex-start">
                {[...Array(12)].map((_, index) => (
                  <Grid xs={6} sm={2} key={index}>
                    <Card isPressable>
                      <Card.Body css={{ p: 0 }}>
                        <Card.Image
                          src={`/demo-collection/Group ${index + 2}.png`}
                          objectFit="fill"
                          width={'100%'}
                          height={'100%'}
                          alt={'img'}
                        />
                      </Card.Body>
                      <Card.Footer css={{ justifyItems: 'flex-start' }}>
                        <Row wrap="wrap" justify="space-between" align="center">
                          <div className="text-black">
                            BAYC Denver #{index + 1}
                          </div>
                        </Row>
                      </Card.Footer>
                    </Card>
                  </Grid>
                ))}
              </Grid.Container>
              {/* <div className="h-full w-1/4 items-center bg-black">
            <button
              // onClick={mint}
              className="flex h-60 w-full items-center justify-center py-2 text-3xl font-bold text-white  hover:scale-105 hover:cursor-pointer"
            >
              MINT NOW
            </button>
          </div> */}
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
                      <div className="flex w-full flex-col gap-8 px-4 text-black">
                        <div className="flex w-full items-center gap-2 text-lg">
                          <div className="font-bold tracking-wide">
                            Yield strategy:{' '}
                          </div>
                          <div>salusETH (SSV Staking Pool) </div>
                        </div>

                        <div className="flex items-center gap-16">
                          <div className="">
                            <div className="text-sm font-bold opacity-80">
                              DAO TVL
                            </div>
                            <div className="text-5xl font-bold">1,105 ETH</div>
                          </div>
                          <div className="">
                            <div className="text-sm font-bold opacity-80">
                              Total APY
                            </div>
                            <div className="text-5xl font-bold">5.20%</div>
                          </div>
                        </div>

                        <div className="text-sm opacity-80">
                          <div className="font-bold">Outlook</div>
                          <div className="opacity-60">
                            The algorithm predicts the current APY of 5.20% to
                            fall below 4.16% within the next 4 weeks.
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
        )}

        {displayType === defaultTabs[1].href && (
          <div className="flex w-full flex-col gap-8 py-10">
            <div className="flex h-full w-full items-center justify-center gap-8">
              <div className="h-96 w-1/2">
                <Card css={{ mw: '100%', height: '100%' }}>
                  <Card.Body>
                    <div className="flex w-full flex-col gap-8 px-4 text-black">
                      <div className="text-4xl font-bold">DAO Vault Pool</div>
                      <div className=" w-full ">
                        <div className="text-sm font-bold tracking-wide opacity-80">
                          Yield strategy
                        </div>
                        <div className="text-3xl font-semibold">
                          <div>salusETH (SSV Staking Pool) </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-16">
                        <div className="">
                          <div className="text-sm font-bold opacity-80">
                            TVL
                          </div>
                          <div className="text-5xl font-bold">1,105 ETH</div>
                        </div>
                        <div className="">
                          <div className="text-sm font-bold opacity-80">
                            Total APY
                          </div>
                          <div className="text-5xl font-bold">5.20%</div>
                        </div>
                      </div>

                      <div className="text-sm opacity-80">
                        <div className="font-bold">Outlook</div>
                        <div className="opacity-60">
                          The algorithm predicts the current APY of 5.20% to
                          fall below 4.16% within the next 4 weeks.
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div className="h-96 w-1/2">
                <Card css={{ mw: '100%', height: '100%' }}>
                  <Card.Body>
                    <div className="flex w-full flex-col gap-8 px-4 text-black">
                      <div className="text-4xl font-bold">Income</div>
                      <div className="flex w-full items-center justify-between">
                        <div className="">
                          <div className="text-sm font-bold opacity-80">
                            Available income
                          </div>
                          <div className="text-5xl font-bold">$48,000</div>
                        </div>
                        <div className="">
                          <div className="text-sm font-bold opacity-80">
                            Next Month Income (Estimated)
                          </div>
                          <div className="text-5xl font-bold">$12,000</div>
                        </div>
                        <Button
                          color="success"
                          size={'lg'}
                          // onClick={handleBorrow}
                        >
                          Claim
                        </Button>
                      </div>

                      <div className="text-sm opacity-80">
                        <div className="font-bold">How to calculate</div>
                        <div className="opacity-60">
                          Creator income = Vault yield * creator shares / total
                          shares
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
            <div className="w-full">
              <Card css={{ mw: '100%' }}>
                <Card.Body>
                  <div className="flex w-full flex-col gap-8 px-4 text-black">
                    <div className="text-4xl font-bold">Borrow</div>
                    <BorrowSection />
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        )}

        {displayType === defaultTabs[2].href && (
          <div className="flex w-full flex-col gap-8 py-10">
            <div className="flex h-full w-full items-center justify-center gap-8">
              <div className="h-96 w-1/2">
                <Card css={{ mw: '100%', height: '100%' }}>
                  <Card.Body>
                    <div className="flex w-full flex-col gap-8 px-4 text-black">
                      <div className="text-4xl font-bold">Claim rewards</div>
                      <div className="flex w-full items-center justify-between">
                        <div className="">
                          <div className="text-sm font-bold opacity-80">
                            Get
                          </div>
                          <div className="text-5xl font-bold">20 USDC</div>
                        </div>
                      </div>

                      <div className="text-sm opacity-80">
                        <div className="font-bold">How?</div>
                        <div className="opacity-60">
                          Your nft has sustained vault gains. You can get
                          rewards from yield generating pool
                        </div>
                      </div>
                      <Button color="success" size={'lg'} auto>
                        Claim
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div className="h-96 w-1/2">
                <Card css={{ mw: '100%', height: '100%' }}>
                  <Card.Body>
                    <div className="flex w-full flex-col gap-8 px-4 text-black">
                      <div className="text-4xl font-bold">Exit</div>
                      <div className="flex w-full items-center justify-between">
                        <div className="">
                          <div className="text-sm font-bold opacity-80">
                            Get
                          </div>
                          <div className="text-5xl font-bold">160 USDC</div>
                        </div>
                      </div>

                      <div className="text-sm opacity-80">
                        <div className="font-bold">How to calculate</div>
                        <div className="opacity-60">
                          Holder revenue = Vault yield * holder shares / total
                          shares
                        </div>
                      </div>
                      <Button color="success" size={'lg'} auto>
                        <div className="font-bold">Exit communtiy</div>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default CollectionPage

CollectionPage.Layout = Layout
