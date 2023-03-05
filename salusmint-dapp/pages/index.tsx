import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex min-h-[90vh] w-full max-w-7xl flex-col justify-center">
        <div className="max-w-7xl text-7xl font-bold">
          <span className="tracking-wider text-[#81FF88]">Salus</span>Mint
        </div>

        <div className="max-w-6xl pt-10 text-2xl tracking-wide opacity-90">
          Offers a sustainable source of income for both{' '}
          <span className="font-bold text-[#81FF88]">creators</span> and{' '}
          <span className="font-bold text-[#81FF88]">holders </span>
          via{' '}
          <span className="font-bold text-[#81FF88]">
            yield generating pools
          </span>
          , leading community towards to the{' '}
          <span className="font-bold text-[#81FF88]">long term succeed</span>
        </div>

        <div className="flex gap-4 ">
          <Link
            href={'/new'}
            //   onClick={() => setLoading(true)}
            className="mt-6 flex w-60 items-center justify-center border border-white px-6 py-2 font-semibold text-white hover:scale-105 hover:cursor-pointer"
          >
            Create NFT Collection
          </Link>
          <Link
            href={'/#explore'}
            //   onClick={() => setLoading(true)}
            className="mt-6 flex w-60 items-center justify-center border border-white px-6 py-2 font-semibold text-white hover:scale-105 hover:cursor-pointer"
          >
            Explore
          </Link>
        </div>
      </div>

      <div
        className="my-20 flex w-full max-w-7xl flex-col justify-center"
        id="explore"
      >
        <div className="text-3xl font-bold tracking-wide">
          Explore Collection
        </div>
        <div className="mt-8 w-full">
          <div className="grid w-full grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {[2, 4, 10, 8, 12, 14, 16, 17].map((item, idx) => (
              <div
                key={item}
                className="relative w-full overflow-hidden rounded-xl hover:scale-105 hover:cursor-pointer"
              >
                <Link
                  href={
                    '/collection/0x342ff16093c904711458396726d3e86befb0bbd8?vaultAddress=0x7f1518f207a778c381930a4dcc32eab5677b266f'
                  }
                >
                  <Image
                    src={`/demo-collection/Group ${item}.png`}
                    className="h-full w-full  object-fill"
                    width={600}
                    height={1000}
                    alt="nft"
                  />
                </Link>
                <div className="absolute bottom-0 w-full">
                  <div className="flex h-10 w-full items-center bg-black px-2  opacity-80">
                    <div className="font-bold text-white">
                      Collection Example {idx + 1}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

Home.Layout = Layout

// BUIDL THE SOLID Trust for NFT Ecosystem

// For Creators, Holders and whole community
