import React, { useEffect, useState } from 'react'
import Layout from '@components/Layout'
import Image from 'next/image'
import { NFTContractAbi } from '@config/abi'
import { USDCAddress } from '@config/constant'
import { useRouter } from 'next/router'
import { BigNumber } from 'ethers'
import {
  erc20ABI,
  useAccount,
  useContract,
  useContractWrite,
  usePrepareContractWrite,
  useSigner,
} from 'wagmi'
import { Button } from '@nextui-org/react'

export default function MintPage() {
  const router = useRouter()
  const { address } = useAccount()
  const { id: nftAddress, vaultAddress } = router.query
  const [mintAmount, setMintAmount] = useState(0)

  const [allowance, setAllowance] = useState(BigNumber.from(0))
  const { data: signer } = useSigner({
    chainId: 31337,
  })

  const contract = useContract({
    address: USDCAddress,
    abi: erc20ABI,
    signerOrProvider: signer,
  })

  const { config: approveERC20Config } = usePrepareContractWrite({
    address: USDCAddress,
    chainId: 31337,
    abi: erc20ABI,
    functionName: 'approve',
    args: [vaultAddress, BigNumber.from(10 ** 15)],
  })

  const { writeAsync: approveERC20Fun } = useContractWrite(approveERC20Config)
  useEffect(() => {
    async function init() {
      if (contract == null || signer == null || typeof address !== 'string') {
        return
      }
      const allowance = await contract.allowance(address, vaultAddress)
      setAllowance(allowance)
      // console.log('allowance', allowance)
    }
    init()
  }, [contract, signer, address])

  const payAmount = BigNumber.from(2 * 10 ** 6)
  // const tx = await smartMintNFTContract
  //   .connect(purchaser1)
  //   .mint(purchaser1.address, payAmount)

  const mintWriteConfig = {
    mode: 'recklesslyUnprepared',
    address: nftAddress,
    chainId: 31337,
    abi: NFTContractAbi,
    functionName: 'mint',
    args: [address, payAmount],
  }
  const { writeAsync: mintFun } = useContractWrite(mintWriteConfig)

  async function mint() {
    console.log('allowance', allowance)
    if (allowance?.lt(payAmount) && approveERC20Fun) {
      // TODO: ERROR HANDLING
      const approvalTx = await approveERC20Fun()
      const res = await approvalTx.wait()
      console.log(res)
    }
    if (mintFun) {
      const tx = await mintFun()
      const result = await tx.wait()
      console.log(result)
    }
  }
  return (
    <div className="w-full max-w-6xl">
      {/* BANNER */}
      {/* <div className="relative mt-6 flex h-60 w-full justify-center">
        <Image
          src="/demo-collection/banner.jpeg"
          alt="banner"
          fill
          className="object-conain"
        />
      </div> */}
      {/* MINT SECTION */}
      <div className="mt-10 flex w-full items-center justify-between gap-10">
        <div className="relative flex w-3/5 flex-col gap-4">
          <div className="mt-6 text-5xl font-bold">BAYC ETH DENVER (Demo)</div>
          <div className="opacity-60">
            BAYC ETH DENVER is the demo NFT collection launched on SalusMint,
            which is the next generation of no code NFT launched platform fully
            backed by Blue chip DeFi to prevent creators from cashing out all
            their sale proceeds at once and to foster a thriving community
            focused on health.
          </div>
          <div className="flex flex-col gap-4">
            <button className="mt-2 flex w-48 items-center justify-center border border-black px-6 py-2 font-semibold hover:scale-105 hover:cursor-pointer">
              Supply: 10000
            </button>
            <button className="mt-2 flex w-48 items-center justify-center border border-black px-6 py-2 font-semibold hover:scale-105 hover:cursor-pointer">
              200 USDC per each
            </button>
          </div>
          <div className="pt-10 text-lg">Select the mint amount</div>
          <div className="flex w-full gap-2 pt-4">
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
              onChange={(e) => setMintAmount(e.target.value)}
              className="w-32 px-4 text-lg  font-bold"
            />
            <button
              onClick={() => setMintAmount((x) => Math.min(10000, x + 1))}
              className="flex w-20 items-center justify-center border border-black py-2 text-xl font-semibold hover:scale-105 hover:cursor-pointer"
            >
              +
            </button>
          </div>

          <div className="w-62 pt-10">
            <Button color="gradient" size={'lg'} onClick={mint}>
              Public Mint
            </Button>
          </div>
        </div>
        <div className="relative w-1/2 overflow-hidden">
          <Image
            src="/demoNFT.jpeg"
            className="aspect-square rounded-xl object-contain"
            width={'500'}
            height={'500'}
            alt="nft"
          />
        </div>
      </div>
    </div>
  )
}
MintPage.Layout = Layout
