import { POOL } from '@config/constant'
import { Slider } from '@mui/material'
import { Button, Loading } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import {
  useAccount,
  useBalance,
  useChainId,
  useContractRead,
  useContractWrite,
} from 'wagmi'
import { BigNumber } from 'ethers'
import { fromBigNumberToMoney } from '@utils/number'
import EAService from '../../services/EAService'
import timeUtil from '@utils/time'
import { Router, useRouter } from 'next/router'

function BorrowSection() {
  const [loading, setLoading] = useState(false)
  const { address } = useAccount()
  const chainId = useChainId()

  // const { data: signer } = useSigner({
  //   chainId,
  // })

  const balance = useBalance({
    address: POOL.pool as `0x${string}`,
    chainId: chainId,
    token: POOL.poolUnderlyingToken.address as `0x${string}`,
  })

  const { data: creditRecordMapping } = useContractRead({
    address: POOL.pool as `0x${string}`,
    chainId: chainId,
    abi: POOL.poolAbi,
    functionName: 'creditRecordMapping',
    args: [address],
  })

  const { data: creditRecordStaticMapping } = useContractRead({
    address: POOL.pool as `0x${string}`,
    chainId: chainId,
    abi: POOL.poolAbi,
    functionName: 'creditRecordStaticMapping',
    args: [address],
  })

  const [currBorrowPercent, setCurrBorrowPercent] = useState(0)
  const [credit, setCredit] = useState(BigNumber.from(0))
  const [currentBalance, setCurrentBalance] = useState(BigNumber.from(0))
  const [dueDate, setDueDate] = useState(null)

  const [liquidity, setLiquidity] = useState(BigNumber.from(0))

  const [showBorrow, setShowBorrow] = useState(false)
  const [showPay, setShowPay] = useState(false)
  const router = useRouter()

  const borrowWriteConfig = {
    mode: 'recklesslyUnprepared',
    address: POOL.pool as `0x${string}`,
    chainId: chainId,
    abi: POOL.poolAbi,
    functionName: 'drawdown',
    args: [BigNumber.from((currBorrowPercent * credit.toNumber()) / 100)],
  }
  const { writeAsync: borrowMoney } = useContractWrite(borrowWriteConfig)

  const payWriteConfig = {
    mode: 'recklesslyUnprepared',
    address: POOL.pool as `0x${string}`,
    chainId: chainId,
    abi: POOL.poolAbi,
    functionName: 'makePayment',
    args: [
      address,
      BigNumber.from((currBorrowPercent * currentBalance.toNumber()) / 100),
    ],
  }
  const { writeAsync: payMoney } = useContractWrite(payWriteConfig)

  useEffect(() => {
    async function fetch() {
      console.log(creditRecordMapping)
      console.log(creditRecordStaticMapping)
      if (creditRecordStaticMapping?.creditLimit?.gt(BigNumber.from(0))) {
        setCredit(creditRecordStaticMapping.creditLimit)
      }

      if (creditRecordMapping?.unbilledPrincipal?.gt(BigNumber.from(0))) {
        // console.log(creditRecordStaticMapping.unbilledPrincipal)
        setCurrentBalance(creditRecordMapping.unbilledPrincipal)
      }

      if (creditRecordMapping?.dueDate?.gt(BigNumber.from(0))) {
        // console.log(creditRecordStaticMapping.unbilledPrincipal)
        setDueDate(creditRecordMapping.dueDate?.toNumber() ?? null)
      }
    }
    fetch()
  }, [creditRecordStaticMapping, creditRecordMapping])

  // useEffect(() => {
  //   async function fetch() {
  //     if (!isLoadingCreditRecordMapping) {
  //       console.log(creditRecordMapping)
  //     }
  //   }
  //   fetch()
  // }, [isLoadingCreditRecordMapping, creditRecordMapping])

  useEffect(() => {
    if (balance.data?.value) {
      setLiquidity(balance.data?.value)
    }
  }, [balance])

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
      if (result?.creditLimit > 0) {
        setCredit(BigNumber.from(result?.creditLimit))
      }
      // handleApprove()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
    } finally {
      setLoading(false)
    }
  }

  async function handleBorrow() {
    if (borrowMoney) {
      const borrowResult = await borrowMoney()
      router.reload()
      console.log(borrowResult)
    }
  }

  async function handlePayBack() {
    if (payMoney) {
      const payResult = await payMoney()
      router.reload()
      console.log(payResult)
    }
  }

  // useEffect(() => {
  //   console.log('data', data)
  // }, [data])
  return (
    <>
      {/* {credit.eq(BigNumber.from(0)) && ( */}
      {/* <div className="flex flex-col items-start">
        <div className="text-3xl uppercase opacity-80">Liquidity</div>
        <div className="text-5xl font-bold">
          {fromBigNumberToMoney(liquidity)}
        </div>
      </div> */}
      {/* )} */}
      <div className="flex items-center justify-between py-10">
        <div className="flex flex-col gap-4">
          <div className="text-2xl opacity-80">Available Credit</div>
          <div className="text-4xl font-bold">
            {fromBigNumberToMoney(credit)}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-2xl opacity-80">Current Balance</div>
          <div className="text-4xl font-bold">
            {' '}
            {fromBigNumberToMoney(currentBalance)}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-2xl opacity-80">
            Due on {new Date(dueDate * 1000).toLocaleDateString()}
          </div>
          <div className="text-4xl font-bold">-</div>
        </div>
        <div className="flex gap-8">
          <Button
            color="success"
            size={'lg'}
            onClick={() => {
              setShowBorrow(false)
              setShowPay(true)
            }}
          >
            Pay
          </Button>
          <Button
            color="secondary"
            size={'lg'}
            onClick={() => {
              setShowBorrow(true)
              setShowPay(false)
            }}
          >
            Borrow
          </Button>
        </div>
      </div>
      {showBorrow && (
        <div>
          {credit.gt(BigNumber.from(0)) ? (
            <div className="flex w-full flex-col items-start">
              <div className="pb-6 text-lg font-semibold opacity-80">
                Choose amount you want to borrow
              </div>
              <div className="text-5xl font-bold">
                {(credit.add(-currentBalance).toNumber() * currBorrowPercent) /
                  100 /
                  10 ** 6}
                <span className="px-2 text-3xl font-bold opacity-60">USDC</span>
              </div>
              <div className="flex w-full gap-2 px-1 py-4">
                <span className="px-2 text-sm">{`0`}</span>
                <Slider
                  aria-label="Default"
                  value={currBorrowPercent}
                  onChange={(e) => setCurrBorrowPercent(e.target?.value)}
                />
                <span className="px-2 text-sm">
                  {fromBigNumberToMoney(credit.add(-currentBalance))}
                </span>
              </div>
              <div className="text-sm">
                <span className="">Origination Fee:</span>
                <span className="pl-2 font-semibold">10 USDC</span>
              </div>
              <div className="mb-4 text-sm">
                <span className="">APY:</span>
                <span className="pl-2 font-semibold">3.3%</span>
              </div>

              <Button color="secondary" size={'lg'} onClick={handleBorrow}>
                Borrow
              </Button>
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
        </div>
      )}

      {showPay && (
        <div className="flex w-full flex-col items-start">
          <div className="pb-6 text-lg font-semibold opacity-80">
            Choose amount you want to pay back
          </div>
          <div className="text-5xl font-bold">
            {(currentBalance.toNumber() * currBorrowPercent) / 100 / 10 ** 6}
            <span className="px-2 text-3xl font-bold opacity-60">USDC</span>
          </div>
          <div className="flex w-full gap-2 px-1 py-4">
            <span className="px-2 text-sm">{`0`}</span>
            <Slider
              aria-label="Default"
              value={currBorrowPercent}
              onChange={(e) => setCurrBorrowPercent(e.target?.value)}
            />
            <span className="px-2 text-sm">
              {fromBigNumberToMoney(currentBalance)}
            </span>
          </div>
          <Button color="success" size={'lg'} onClick={handlePayBack}>
            Pay
          </Button>
        </div>
      )}
    </>
  )
}

export default BorrowSection
