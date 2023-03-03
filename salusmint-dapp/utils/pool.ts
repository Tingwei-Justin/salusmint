import BASE_POOL_CONFIG_ABI from '../abis/BasePoolConfig.json'
import BASE_CREDIT_POOL_ABI from '../abis/BaseCreditPool.json'
import HDT_ABI from '../abis/HDT.json'

export enum ChainEnum {
  Local = 31337,
}
export enum POOL_NAME {
  HumaCreditLine = 'HumaCreditLine',
}

export enum POOL_TYPE {
  CreditLine = 'CreditLine',
}

export type PoolMapType = {
  [poolType in POOL_TYPE]: {
    [poolName: string]: {
      name: string
      borrowDesc: string
      lendDesc: string
    }
  }
}

export type PoolInfoType = {
  basePoolConfig: string
  pool: string
  poolFeeManager: string
  poolUnderlyingToken: {
    address: string
    symbol: string
    decimals: number
    icon: any
  }
  assetAddress?: string
  poolName: POOL_NAME
  poolType: POOL_TYPE
  poolAbi: unknown
  basePoolConfigAbi: unknown
  HDT: {
    address: string
    abi: unknown
  }
}

export type PoolContractMapType = {
  [chainId: number]: {
    [POOL_TYPE.CreditLine]: {
      [poolName: string]: PoolInfoType
    }
  }
}

export const PoolMap: PoolMapType = {
  [POOL_TYPE.CreditLine]: {
    [POOL_NAME.HumaCreditLine]: {
      name: 'Huma Credit Line',
      borrowDesc:
        'Credit lines backed by your future crypto income. Only available to the members of partner DAOs during beta.',
      lendDesc:
        'Earn active yield by participating in credit lines backed by on-chain income. Only available to the members of partner DAOs during beta.',
    },
  },
}
