import { POOL } from '@config/constant'
import { Slider } from '@mui/material'
import { Loading } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useAccount, useBalance, useChainId, useContractRead } from 'wagmi'
import { BigNumber } from 'ethers'
import { fromBigNumberToMoney } from '@utils/number'
import EAService from '../../services/EAService'
import timeUtil from '@utils/time'
import { useContract } from '../../hooks/useContract'

function BorrowSection() {
  const [loading, setLoading] = useState(false)
  const { address } = useAccount()
  const chainId = useChainId()
  const balance = useBalance({
    address: POOL.pool as `0x${string}`,
    chainId: 31337,
    token: POOL.poolUnderlyingToken.address as `0x${string}`,
  })

  const { data, isError, isLoading } = useContractRead({
    address: POOL.pool as `0x${string}`,
    chainId: 31337,
    abi: POOL.poolAbi,
    functionName: 'creditRecordMapping',
    args: [address],
  })

  const [currBorrowAmount, setCurrBorrowAmount] = useState(0)
  const [credit, setCredit] = useState(BigNumber.from(0))

  const [liquidity, setLiquidity] = useState(BigNumber.from(0))

  useEffect(() => {
    if (balance.data?.value) {
      setLiquidity(balance.data?.value)
    }
  }, [balance.data?.value])

  async function checkCreditLine() {
    setLoading(true)
    try {
      const payload = {
        poolAddress: POOL.pool,
        borrowerWalletAddress: address,
        receivableAddress: '',
      }
      const result = await EAService.approve(payload, chainId, async () => {
        return true
      })
      console.log('approve result', result)
      await timeUtil.sleep(2000)
      // handleApprove()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log('data', data)
  }, [data])
  return (
    <>
      {credit.eq(BigNumber.from(0)) && (
        <div className="flex flex-col items-end">
          <div className="text-5xl font-bold">
            {fromBigNumberToMoney(liquidity)}
          </div>
          <div className="text-3xl uppercase opacity-80">Liquidity</div>
        </div>
      )}

      {credit.gt(BigNumber.from(0)) ? (
        <div className="flex w-full flex-col items-end px-8">
          <div className="pb-6 text-lg font-semibold opacity-80">
            Choose amount you want to borrow
          </div>
          <div className="text-5xl font-bold">
            {(10000 * currBorrowAmount) / 100}
            <span className="px-2 text-3xl font-bold opacity-60">USDC</span>
          </div>
          <div className="flex w-full gap-2 px-1 py-4">
            <span className="px-2 text-sm">{`0`}</span>
            <Slider
              aria-label="Default"
              value={currBorrowAmount}
              onChange={(e) => setCurrBorrowAmount(e.target?.value)}
            />
            <span className="px-2 text-sm">{`10,000`}</span>
          </div>
          <div className="text-sm">
            <span className="">Origination Fee:</span>
            <span className="pl-2 font-semibold">3 USDC</span>
          </div>
          <div className="text-sm">
            <span className="">APY:</span>
            <span className="pl-2 font-semibold">6%</span>
          </div>
          <button
            //   onClick={() => setLoading(true)}
            className="mt-6 flex w-48 items-center justify-center border border-black px-6 py-2 font-semibold hover:scale-105 hover:cursor-pointer"
          >
            BORROW
          </button>
        </div>
      ) : (
        <div>
          {loading && <Loading>Checking...</Loading>}
          {!loading && (
            <button
              onClick={() => checkCreditLine()}
              className="flex w-48 items-center justify-center border border-black px-6 py-2 font-semibold hover:scale-105 hover:cursor-pointer"
            >
              Check your credit line
            </button>
          )}
        </div>
      )}

      <div className="absolute bottom-4 left-4 text-xl font-bold">Borrow</div>
    </>
  )
}

export default BorrowSection
