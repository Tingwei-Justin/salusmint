import { POOL_NAME, POOL_TYPE } from '@utils/pool'
import BASE_POOL_CONFIG_ABI from '../abis/BasePoolConfig.json'
import BASE_CREDIT_POOL_ABI from '../abis/BaseCreditPool.json'
import HDT_ABI from '../abis/HDT.json'

export const USDCAddress = '0x8f86403A4DE0BB5791fa46B8e795C547942fE4Cf'
export const PROTOCOL_ADDRESS = '0x5081a39b8A5f0E35a8D959395a630b68B74Dd30f'

const DEPLOYED_CONTRACTS = {
  USDC: '0xdbC43Ba45381e02825b14322cDdd15eC4B3164E6',
  EANFT: '0x663F3ad617193148711d28f5334eE4Ed07016602',
  HumaConfig: '0x04C89607413713Ec9775E14b954286519d836FEf',
  BaseCreditPoolFeeManager: '0x4C4a2f8c81640e47606d3fd77B353E87Ba015584',
  BaseCreditHDTImpl: '0x21dF544947ba3E8b3c32561399E88B52Dc8b2823',
  BaseCreditHDT: '0x2E2Ed0Cfd3AD2f1d34481277b3204d807Ca2F8c2',
  BaseCreditPoolConfig: '0xD8a5a9b31c3C0232E196d518E89Fd8bF83AcAd43',
  BaseCreditPoolImpl: '0xDC11f7E700A4c898AE5CAddB1082cFfa76512aDD',
  BaseCreditPool: '0x51A1ceB83B83F1985a81C295d1fF28Afef186E02',
}

export const POOL = {
  basePoolConfig: DEPLOYED_CONTRACTS.BaseCreditPoolConfig, // TODO: Replace this with the BaseCreditPoolConfig contract address
  pool: DEPLOYED_CONTRACTS.BaseCreditPool, // TODO: Replace this with the BaseCreditPool contract address
  poolFeeManager: DEPLOYED_CONTRACTS.BaseCreditPoolFeeManager, // TODO: Replace this with the BaseCreditPoolFeeManager contract address
  poolUnderlyingToken: {
    address: DEPLOYED_CONTRACTS.USDC, // TODO: Replace this with the USDC contract address
    symbol: 'USDC',
    decimals: 6,
    icon: '',
  },
  poolName: POOL_NAME.HumaCreditLine,
  poolType: POOL_TYPE.CreditLine,
  poolAbi: BASE_CREDIT_POOL_ABI,
  basePoolConfigAbi: BASE_POOL_CONFIG_ABI,
  HDT: {
    address: DEPLOYED_CONTRACTS.BaseCreditHDT, // TODO: Replace this with the BaseCreditHDT contract address
    abi: HDT_ABI,
  },
}
