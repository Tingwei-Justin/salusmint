import React from 'react'
import Layout from '@components/Layout'
import dynamic from 'next/dynamic'
import { Badge, Card } from '@nextui-org/react'
import BorrowSection from '@components/Borrow/BorrowSection'
import BurnSection from '@components/Burn/BurnSection'
import Marquee from 'react-fast-marquee'
import Image from 'next/image'
import Link from 'next/link'

const HealthIndicatorChart = dynamic(
  () => import('@components/Chart/HealthIndicatorChart'),
  {
    ssr: false,
  }
)

const NFTVaultChart = dynamic(() => import('@components/Chart/NFTVaultChart'), {
  ssr: false,
})

function ProjectPage() {
  const data = [
    {
      name: '2022-06-02',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: '2022-07-02',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: '2022-08-02',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: '2022-09-02',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: '2022-10-02',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: '2022-11-02',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: '2022-12-02',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ]

  return (
    <div className="flex w-full justify-center px-4">
      <div className="h-full w-full">
        <div className="flex h-full w-full border-black">
          <div className="w-1/3 divide-y divide-black border-r-2 border-black">
            <div className="py-2 px-4 text-3xl font-bold tracking-wider">
              ETH DENVER NFT DEMO
            </div>
            <div className="flex w-full divide-x divide-black px-4  text-lg">
              <span className="w-1/3 py-2 font-bold">Creator</span>
              <span className="w-2/3 px-4 py-2">Sartoshi</span>
            </div>
            <div className="flex w-full divide-x divide-black px-4  text-lg">
              <span className="w-1/3 py-2 font-bold">Total amount</span>
              <span className="w-2/3 px-4 py-2">10,000</span>
            </div>
            <div className="p-4 opacity-80">
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text
              used in laying out print, graphic or web designs. The passage is
              attributed to an unknown typesetter in the 15th century who is
              thought to have scrambled parts of Cicero De Finibus Bonorum et
              Malorum for use in a type specimen book. It usually begins with:
            </div>

            <div className="py-4 text-xl font-semibold">
              <Link className="p-4 text-black" href="/project/demo/mint">
                MINT NOW
              </Link>
            </div>

            <div className="p-4">
              <Marquee>
                {[...Array(17)].map((i, idx) => (
                  <Image
                    key="idx"
                    src={`/demo-collection/Group ${idx + 1}.png`}
                    className="rounded-lg object-contain px-2"
                    width={150}
                    height={150}
                    alt="nft"
                  />
                ))}
              </Marquee>
            </div>
            <div className="w-full border-2 border-black" />

            <div className="w-full">
              <div className="px-4 py-2 text-xl font-bold">
                Health Indicator
              </div>
              <div className="w-full border-b-2 border-black" />
              <div className="flex w-full items-center">
                <div className="flex h-60 w-3/4 items-center justify-center">
                  <HealthIndicatorChart />
                </div>
                <div className="px-4">
                  <Card isHoverable variant="bordered" css={{ mw: '300px' }}>
                    <Card.Body>
                      <div className="flex items-center justify-center gap-2 text-lg">
                        <span className="font-bold"> Score:</span>
                        <span>78</span>
                        <Badge isSquared color="success" size={'xs'}>
                          <span className="text-sm tracking-wider">Good</span>
                        </Badge>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-full w-2/3 overflow-hidden">
            <div className="absolute -top-4 -left-4 h-4 w-8 bg-black" />
            <div className="relative flex h-[45vh] w-full justify-center border-b border-black pt-6">
              <NFTVaultChart data={data} />
              <div className="absolute bottom-4 w-full text-center text-xl font-bold">
                NFT VAULT
              </div>
            </div>
            <div className="flex h-full w-full divide-x divide-black">
              <div className="relative flex h-[40vh] w-1/2 flex-col items-center justify-center gap-6">
                <BorrowSection />
              </div>
              <div className="relative flex h-[40vh] w-1/2 flex-col items-center justify-center gap-6">
                <BurnSection />
                <div className="absolute bottom-4 left-4 text-xl font-bold">
                  Burn
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProjectPage

ProjectPage.Layout = Layout
