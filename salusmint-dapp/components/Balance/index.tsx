import { POOL } from '@config/constant'
import React from 'react'
import { useAccount, useBalance } from 'wagmi'

function Balance() {
  const { address } = useAccount()

  const usdcBalance = useBalance({
    address: address,
    chainId: 31337,
    token: POOL.poolUnderlyingToken.address as `0x${string}`,
  })

  return (
    <div className="px-2 font-semibold">
      {`${usdcBalance?.data?.formatted} ${usdcBalance?.data?.symbol}`}
    </div>
  )
}

export default Balance
