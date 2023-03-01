import Image from 'next/image'
import React from 'react'

function BurnSection() {
  return (
    <div className="flex w-full justify-center gap-6">
      <div className="w-2/5 pl-6">
        <Image
          src="/demoNFT.jpeg"
          className=" rounded-lg object-contain"
          width={150}
          height={150}
          alt="nft"
        />
      </div>
      <div className="flex w-3/5 flex-col items-end px-8">
        <div className="pb-6 text-lg font-semibold opacity-80">
          Burn your NFT, you will get
        </div>
        <div className="text-5xl font-bold">
          80
          <span className="px-2 text-3xl font-bold opacity-60">USDC</span>
        </div>
        <button
          //   onClick={() => setLoading(true)}
          className="mt-8 flex w-48 items-center justify-center border border-black px-6 py-2 font-semibold hover:scale-105 hover:cursor-pointer"
        >
          BURN
        </button>
      </div>
    </div>
  )
}

export default BurnSection
