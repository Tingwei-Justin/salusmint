/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { USDCAddress } from '@config/constant'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Text } from '@nextui-org/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { BigNumber } from 'ethers'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { erc20ABI, useAccount, useContract, useSigner } from 'wagmi'

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Create', href: '/new', current: false },
  { name: 'Explore', href: '/#explore', current: false },
]

export default function Example() {
  const [balance, setBalance] = useState(BigNumber.from(0))
  const { address } = useAccount()
  const { data: signer } = useSigner({
    chainId: 31337,
  })
  const contract = useContract({
    address: USDCAddress,
    abi: erc20ABI,
    signerOrProvider: signer,
  })

  useEffect(() => {
    async function init() {
      if (contract == null || signer == null || address == null) {
        return
      }
      const balance = await contract.balanceOf(address)
      setBalance(balance)
      // console.log('balance', balance)
    }
    init()
  }, [contract, signer, address])

  return (
    <div className="mx-auto w-full bg-black">
      <div className="relative flex items-center justify-between px-8 py-3">
        <Link className="relative z-10 flex " href="/">
          <div className="flex flex-shrink-0 items-center">
            <Image
              width={248}
              height={50}
              src="/logo-with-text.png"
              alt="Your Company"
            />
            {/* <Text
              h1
              size={32}
              css={{
                textGradient: '94.48deg, #6AE667 1.08%, #0085FF 94.44%',
              }}
              weight="bold"
            >
              SalusMint
            </Text> */}
          </div>
        </Link>
        <div className="flex gap-10">
          {navigation.map((item, idx) => (
            <Link href={item.href} key={item.name}>
              <div className="text-lg font-bold tracking-wide text-white">
                {item.name}
              </div>
            </Link>
          ))}
        </div>
        <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
          <ConnectButton />
        </div>
      </div>
    </div>
  )
}
