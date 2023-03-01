import React, { useEffect, useState } from 'react'
import Layout from '@components/Layout'
import { Button, Dropdown, Input, Text } from '@nextui-org/react'
import Image from 'next/image'
import { Slider } from '@mui/material'
import { useContractWrite } from 'wagmi'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { salusMintProtocolAbi } from '@config/abi'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { USDCAddress } from '@config/constant'

const helpInfo = {
  'contract-name': {
    title: 'What is contract name?',
    description:
      'Your contract name The contract name is the main identifier for your contract and will appear anywhere your contract is mentioned. This is usually your artist name, brand, or identity. This field accepts alpha numeric characters and spaces and can be any length. We recommend less than 15 characters, however this is not a hard requirement.',
  },
  'contract-symbol': {
    title: 'What is contract symbol?',
    description:
      'The token symbol will be displayed on Etherscan when others come to view your smart contract. The symbol is also used when sharing links to your smart contracts, and platforms where NFT sales and transfer activity are displayed. Input is limited here to 5 alphanumeric characters.',
  },
  'yield-generator': {
    title: 'What is vault yield generator?',
    description:
      'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
  },
  'vault-share': {
    title: 'What is Vault share',
    description:
      'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
  },
}
const supportYields = {
  'Lower risk': [
    {
      name: 'Lido',
      network: 'mainnet',
      apy: '4.92',
    },
    {
      name: 'AAVE V2',
      network: 'mainnet',
      apy: '3.1',
    },
    {
      name: 'Yearn Finance',
      network: 'mainnet',
      apy: '3.0',
    },
  ],
  'Higher risk': [
    {
      name: 'Ribbon',
      network: 'mainnet',
      apy: '8.71',
    },
    {
      name: 'Fractal Protocol',
      network: 'mainnet',
      apy: '8',
    },
  ],
}

export default function NewContractPage() {
  const [nftAddress, setNftAddress] = useState('')
  const [vaultAddress, setVaultAddress] = useState('')
  const { push } = useRouter()
  const { width, height } = useWindowSize()
  const [showConfetti, setShowConfetti] = useState(false)
  const initNFTInput = [
    'ETHDenverDemo',
    'eth-denver',
    USDCAddress,
    '0x976EA74026E726554dB657fA54763abd0C3a0aa9', // creator1Address,
  ]
  const createVaultInput = ['testVault', 'TV', USDCAddress]

  const deployContractWriteConfig = {
    mode: 'recklesslyUnprepared',
    address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    chainId: 31337,
    abi: salusMintProtocolAbi,
    functionName: 'createSalusNFTPool',
    args: [initNFTInput, createVaultInput],
  }
  const { writeAsync: deployContractFun } = useContractWrite(
    deployContractWriteConfig
  )

  const [selectedYield, setSelectedYield] = useState(new Set())
  const [selectedHelpInfo, setSelectedHelpInfo] = useState<{
    title: string
    description: string
  }>(helpInfo['contract-name'])
  const selectedYieldValue = React.useMemo(
    () => Array.from(selectedYield).join(', ').replaceAll('_', ' '),
    [selectedYield]
  )
  const [creatorsSharePercent, setCreatorSharePercent] = useState(50)
  const [holdersSharePercent, setHoldersharePercent] = useState(50)

  function handleVauleChange(e) {
    const creatorsPercent = Number(e?.target?.value) ?? 0
    const holdersPercent = 100 - Number(creatorsPercent)
    setCreatorSharePercent(creatorsPercent)
    setHoldersharePercent(holdersPercent)
  }

  async function deployContract() {
    const deployTx = await deployContractFun()
    const deployResult = await deployTx.wait()
    const nftAddress = `0x${deployResult.logs[2].topics[1].slice(-40)}`
    const vaultAddress = `0x${deployResult.logs[2].topics[2].slice(-40)}`

    console.log('nftAddress', nftAddress)
    console.log('vaultAddress', vaultAddress)

    setNftAddress(nftAddress)
    setVaultAddress(vaultAddress)

    if (
      ethers.utils.isAddress(nftAddress) &&
      ethers.utils.isAddress(vaultAddress)
    ) {
      setShowConfetti(true)
      // setTimeout(() => {
      //   setShowConfetti(false)
      // }, 10000)
    }
  }

  return (
    <div className="container flex w-full justify-center">
      <Confetti width={2000} height={2000} run={showConfetti} />
      <div className="w-full max-w-7xl py-10">
        <div className=" border-2 border-black">
          {/* Header */}
          <div className="b border-b-2 border-black py-4 px-10 text-3xl font-semibold">
            Create NFT smart contract
          </div>
          <div className="flex w-full">
            {/* Form content */}
            <div className="w-3/5 space-y-12 border-r-2 border-black px-10 py-10">
              <div className="w-96">
                <Input
                  clearable
                  underlined
                  labelPlaceholder="Contract name"
                  fullWidth
                  onClick={() => {
                    setSelectedHelpInfo(helpInfo['contract-name'])
                  }}
                />
              </div>

              <div className="w-96">
                <Input
                  clearable
                  underlined
                  labelPlaceholder="Contract symbol"
                  fullWidth
                  onClick={() => {
                    setSelectedHelpInfo(helpInfo['contract-symbol'])
                  }}
                />
              </div>

              <div
                onClick={() => {
                  setSelectedHelpInfo(helpInfo['yield-generator'])
                }}
              >
                <div className="px-1 font-semibold opacity-60">
                  Vault yield generator
                </div>
                <Dropdown>
                  <Dropdown.Button
                    flat
                    color="default"
                    placeholder="Select yield generator"
                  >
                    {selectedYieldValue.length > 0
                      ? selectedYieldValue
                      : 'Select yield generator'}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    color="secondary"
                    aria-label="Actions"
                    css={{ $$dropdownMenuWidth: '280px' }}
                    selectionMode="single"
                    selectedKeys={selectedYield ?? ''}
                    onSelectionChange={setSelectedYield}
                  >
                    <Dropdown.Section title="Lower risk">
                      {supportYields['Lower risk'].map((item) => (
                        <Dropdown.Item
                          key={item.name}
                          description={item.network}
                          command={item.apy + '%'}
                          icon={
                            <Image
                              src="/icons/ethereum.png"
                              height={14}
                              width={14}
                              alt="eth icon"
                            />
                          }
                        >
                          {item.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Section>
                    <Dropdown.Section title="Higher risk">
                      {supportYields['Higher risk'].map((item) => (
                        <Dropdown.Item
                          key={item.name}
                          description={item.network}
                          command={item.apy + '%'}
                          icon={
                            <Image
                              src="/icons/ethereum.png"
                              height={14}
                              width={14}
                              alt="eth icon"
                            />
                          }
                        >
                          {item.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Section>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div
                onClick={() => {
                  setSelectedHelpInfo(helpInfo['vault-share'])
                }}
              >
                <div className="px-1 font-semibold opacity-60">Vault share</div>
                <div className="flex gap-2 px-1">
                  <span className="text-sm">{`Creators ${creatorsSharePercent}%`}</span>
                  <Slider
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    value={creatorsSharePercent ?? 0}
                    onChange={handleVauleChange}
                  />
                  <span className="text-sm">{`Holders ${holdersSharePercent}%`}</span>
                </div>
              </div>

              {ethers.utils.isAddress(nftAddress) &&
              ethers.utils.isAddress(vaultAddress) ? (
                <button
                  className="flex w-52 items-center justify-center border border-black py-2 font-semibold hover:scale-105 hover:cursor-pointer"
                  onClick={() =>
                    push(`/project/${nftAddress}?vaultAddress=${vaultAddress}`)
                  }
                >
                  Check your NFT collection
                </button>
              ) : (
                <button
                  onClick={deployContract}
                  className="flex w-52 items-center justify-center border border-black py-2 font-semibold hover:scale-105 hover:cursor-pointer"
                >
                  Deploy
                </button>
              )}
            </div>

            <div className="w-2/5 p-4">
              <div className="text-3xl font-semibold tracking-wide">
                {selectedHelpInfo.title}
              </div>
              <div className="opacity-60">{selectedHelpInfo.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
NewContractPage.Layout = Layout
