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

export const PoolContractMap: PoolContractMapType = {
  [ChainEnum.Local]: {
    [POOL_TYPE.CreditLine]: {
      [POOL_NAME.HumaCreditLine]: {
        basePoolConfig: '0x09635F643e140090A9A8Dcd712eD6285858ceBef', // TODO: Replace this with the BaseCreditPoolConfig contract address
        pool: '0x67d269191c92Caf3cD7723F116c85e6E9bf55933', // TODO: Replace this with the BaseCreditPool contract address
        poolFeeManager: '0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f', // TODO: Replace this with the BaseCreditPoolFeeManager contract address
        poolUnderlyingToken: {
          address: '0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1', // TODO: Replace this with the USDC contract address
          symbol: 'USDC',
          decimals: 6,
          icon: '',
        },
        poolName: POOL_NAME.HumaCreditLine,
        poolType: POOL_TYPE.CreditLine,
        poolAbi: BASE_CREDIT_POOL_ABI,
        basePoolConfigAbi: BASE_POOL_CONFIG_ABI,
        HDT: {
          address: '0x7a2088a1bFc9d81c55368AE168C2C02570cB814F', // TODO: Replace this with the BaseCreditHDT contract address
          abi: HDT_ABI,
        },
      },
    },
  },
}
