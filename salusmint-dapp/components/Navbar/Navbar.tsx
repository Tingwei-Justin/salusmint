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
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { BigNumber } from 'ethers'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { erc20ABI, useAccount, useContract, useSigner } from 'wagmi'

const navigation = [
  { name: 'Home', href: '/home', current: true },
  { name: 'New Contract', href: '/new', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

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
      console.log('balance', balance)
    }
    init()
  }, [contract, signer, address])

  return (
    <Disclosure as="header" className="shadow bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto w-full">
            <div className="relative flex h-16 justify-between border-b border-black px-8">
              <Link className="relative z-10 flex  text-black" href="/">
                <div className="flex flex-shrink-0 items-center">
                  {/* <Image
                    width={10}
                    height={10}
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  /> */}
                  <div className="px-2 text-xl">SalusMint</div>
                </div>
              </Link>
              <div className="relative z-10 flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                <ConnectButton />
              </div>
            </div>

            {/* <nav
              className="hidden lg:flex lg:space-x-8 lg:py-2 "
              aria-label="Global"
            >
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                    'inline-flex items-center rounded-md py-2 px-3 text-sm font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
            </nav> */}
          </div>

          <Disclosure.Panel as="nav" className="lg:hidden" aria-label="Global">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                    'block rounded-md py-2 px-3 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
