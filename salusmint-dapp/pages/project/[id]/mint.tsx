import React, { useState } from 'react'
import Layout from '@components/Layout'
import Image from 'next/image'

export default function MintPage() {
  const [mintAmount, setMintAmount] = useState(0)
  return (
    <div className="w-full max-w-6xl">
      {/* BANNER */}
      <div className="relative mt-6 flex h-60 w-full justify-center">
        <Image
          src="/demo-collection/banner.jpeg"
          //   width={800}
          //   height={250}
          alt="banner"
          fill
          className="object-conain"
        />
      </div>
      {/* MINT SECTION */}
      <div className="mt-10 flex w-full justify-between">
        <div className="relative h-96 w-96">
          <Image
            src="/demoNFT.jpeg"
            className="object-contain"
            fill
            alt="nft"
          />
        </div>
        <div className="relative flex h-96 w-3/5 flex-col items-center border border-black">
          <div className="mt-6 text-center text-3xl font-bold">
            MINT BAYC DENVER (Unofficial)
          </div>
          <div className="flex w-full items-center justify-center gap-8">
            <button
              //   onClick={() => setLoading(true)}
              className="mt-6 flex w-48 items-center justify-center border border-black px-6 py-2 font-semibold hover:scale-105 hover:cursor-pointer"
            >
              Supply: 10000
            </button>
            <button
              //   onClick={() => setLoading(true)}
              className="mt-6 flex w-48 items-center justify-center border border-black px-6 py-2 font-semibold hover:scale-105 hover:cursor-pointer"
            >
              1 ETH each
            </button>
          </div>

          <div className="pt-10 text-lg">Select the mint amount</div>

          <div className="flex w-full justify-center gap-2 pt-4">
            <button
              onClick={() => setMintAmount((x) => Math.max(0, x - 1))}
              className="flex w-20 items-center justify-center border border-black py-2 text-xl font-semibold hover:scale-105 hover:cursor-pointer"
            >
              -
            </button>
            <input
              value={mintAmount}
              type="number"
              min={0}
              max={10000}
              className="w-20 px-4"
            />
            <button
              onClick={() => setMintAmount((x) => Math.min(10000, x + 1))}
              className="flex w-20 items-center justify-center border border-black py-2 text-xl font-semibold hover:scale-105 hover:cursor-pointer"
            >
              +
            </button>
          </div>

          <button
            //   onClick={() => setLoading(true)}
            className="mt-12 flex w-48 items-center justify-center border border-black px-6 py-2 text-xl font-semibold font-semibold hover:scale-105 hover:cursor-pointer"
          >
            MINT
          </button>
        </div>
      </div>
    </div>
  )
}
MintPage.Layout = Layout
