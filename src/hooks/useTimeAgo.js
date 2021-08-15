const DATE_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
]

let LAST_TIME = 0

export const getDateDiffs = (timestamp, previous) => {
  const elapsed = (timestamp - previous) / 1000
  for (const [unit, secondsUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsUnit || unit === "second") {
      const value = Math.round(elapsed / secondsUnit)
      return { value, unit }
    }
  }
}

export const verifyDiff = (timestamp) => {
  const { value, unit } = getDateDiffs(timestamp, LAST_TIME)
  if (unit === "second" || (unit === "minute" && value <= 2)) return false
  LAST_TIME = timestamp
  return true
}

export const getTimeAgo = (timestamp) => {
  const { value, unit } = getDateDiffs(timestamp, Date.now())
  const rtf = new Intl.RelativeTimeFormat("es", { style: "short" })
  return rtf.format(value, unit)
}
