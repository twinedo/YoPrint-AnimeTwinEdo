export const formatNumber = (value?: number | null) => {
  if (value === undefined || value === null) return '—'
  return Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value)
}

export const formatScore = (score?: number | null) => {
  if (score === undefined || score === null) return 'NR'
  return score.toFixed(1)
}

export const formatAirDate = (season?: string | null, year?: number | null) => {
  if (!season && !year) return 'TBD'
  if (!season) return String(year)
  return `${season} ${year ?? ''}`.trim()
}

export const shortenText = (text?: string | null, limit = 160) => {
  if (!text) return 'No synopsis available yet.'
  if (text.length <= limit) return text
  return `${text.slice(0, limit)}…`
}
