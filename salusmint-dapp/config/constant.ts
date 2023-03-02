import { POOL_NAME, POOL_TYPE } from '@utils/pool'
import BASE_POOL_CONFIG_ABI from '../abis/BasePoolConfig.json'
import BASE_CREDIT_POOL_ABI from '../abis/BaseCreditPool.json'
import HDT_ABI from '../abis/HDT.json'

export const USDCAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
export const PROTOCOL_ADDRESS = '0x59b670e9fA9D0A427751Af201D676719a970857b'
export const POOL = {
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
}
