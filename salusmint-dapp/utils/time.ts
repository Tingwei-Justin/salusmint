import moment from 'moment'

export const MILLISECONDS = 1000
export const DAY_SECONDS = 24 * 60 * 60
export const TIME_FORMAT_LL = 'll'

export const timestampToStr = (timestamp: number, format: string) =>
  moment.unix(timestamp).format(format)

/**
 * Convert timestamp to format ll: Nov 12, 2022
 *
 * @param timestamp
 * @returns format ll: Nov 12, 2022
 */
export const timestampToLL = (timestamp?: number) => {
  if (!timestamp) {
    return ''
  }
  return timestampToStr(timestamp, TIME_FORMAT_LL)
}

/**
 * get unix time in seconds
 *
 * @returns timestamp
 */
export const getUnixTimestamp = (date?: moment.Moment) => {
  if (date) {
    return date.unix()
  }
  return Math.floor(Date.now() / MILLISECONDS)
}

// eslint-disable-next-line no-promise-executor-return
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

const timeUtil = {
  timestampToStr,
  timestampToLL,
  getUnixTimestamp,
  sleep,
}

export default timeUtil
