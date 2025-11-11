export interface AnimeImageVariant {
  imageUrl?: string
  smallImageUrl?: string
  largeImageUrl?: string
}

export interface AnimeImages {
  jpg?: AnimeImageVariant
  webp?: AnimeImageVariant
}

export interface AnimeTitle {
  type: string
  title: string
}

export interface TrailerInfo {
  url?: string
  youtubeId?: string
  embedUrl?: string
}

export interface BroadcastInfo {
  day?: string
  time?: string
  timezone?: string
  string?: string
}

export interface AnimeSynopsisHighlight {
  label: string
  value: string
}

export interface AnimeSummary {
  id: number
  title: string
  japaneseTitle?: string
  synopsis?: string | null
  score?: number | null
  rank?: number | null
  popularity?: number | null
  members?: number | null
  favorites?: number | null
  status?: string | null
  rating?: string | null
  type?: string | null
  season?: string | null
  year?: number | null
  images?: AnimeImages
  episodes?: number | null
  duration?: string | null
  genres?: string[]
  background?: string | null
  trailer?: TrailerInfo
  broadcast?: BroadcastInfo
  studios?: string[]
  streaming?: Array<{ name: string; url: string }>
  external?: Array<{ name: string; url: string }>
  themes?: string[]
  demographics?: string[]
  relations?: Array<{
    relation: string
    entries?: Array<{ mal_id: number; type: string; name: string }>
  }>
  titlesExtended?: AnimeTitle[]
}

export interface PaginationInfo {
  currentPage: number
  lastVisiblePage: number
  hasNextPage: boolean
  itemsPerPage: number
  totalItems?: number
}

export interface SearchResponse {
  pagination: PaginationInfo
  data: AnimeSummary[]
}

export interface SearchParams {
  query: string
  page: number
  filters: {
    status: string
    type: string
    minScore: number | null
  }
}

export interface AnimeDetailResponse {
  data: AnimeSummary & {
    producers?: string[]
    licensors?: string[]
    themes?: string[]
    demographics?: string[]
    relations?: Array<{
      relation: string
      entries: Array<{ mal_id: number; type: string; name: string }>
    }>
    streaming?: Array<{ name: string; url: string }>
    external?: Array<{ name: string; url: string }>
    images: AnimeImages
    titlesExtended?: AnimeTitle[]
  }
}
