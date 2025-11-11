import type {
  AnimeImageVariant,
  AnimeSummary,
  SearchParams,
  SearchResponse,
  TrailerInfo,
} from '../types/anime'

const BASE_URL = 'https://api.jikan.moe/v4'

const buildQuery = (params: Record<string, string | number | boolean | undefined | null>) => {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return
    query.append(key, String(value))
  })
  return query.toString()
}

const toImageVariant = (variant?: any): AnimeImageVariant | undefined =>
  variant
    ? {
        imageUrl: variant.image_url ?? variant.imageUrl,
        smallImageUrl: variant.small_image_url ?? variant.smallImageUrl,
        largeImageUrl: variant.large_image_url ?? variant.largeImageUrl,
      }
    : undefined

const toTrailer = (data?: any): TrailerInfo | undefined =>
  data
    ? {
        url: data.url,
        embedUrl: data.embed_url,
        youtubeId: data.youtube_id,
      }
    : undefined

const mapAnimeSummary = (raw: any): AnimeSummary => ({
  id: raw.mal_id,
  title: raw.title,
  japaneseTitle: raw.title_japanese,
  synopsis: raw.synopsis,
  score: raw.score,
  rank: raw.rank,
  popularity: raw.popularity,
  members: raw.members,
  favorites: raw.favorites,
  status: raw.status,
  rating: raw.rating,
  type: raw.type,
  season: raw.season,
  year: raw.year,
  images:
    raw.images || raw.image_url
      ? {
          jpg: toImageVariant(raw.images?.jpg ?? raw.jpg),
          webp: toImageVariant(raw.images?.webp ?? raw.webp),
        }
      : undefined,
  episodes: raw.episodes,
  duration: raw.duration,
  genres: raw.genres?.map((genre: any) => genre.name) ?? [],
  background: raw.background,
  trailer: toTrailer(raw.trailer),
  broadcast: raw.broadcast,
  studios: raw.studios?.map((studio: any) => studio.name) ?? [],
  streaming: raw.streaming ?? [],
  external: raw.external ?? [],
  themes: raw.themes?.map((theme: any) => theme.name) ?? [],
  demographics: raw.demographics?.map((demo: any) => demo.name) ?? [],
  relations: raw.relations ?? [],
  titlesExtended: raw.titles,
})

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`
    try {
      const errorBody = await response.json()
      if (errorBody?.message) {
        errorMessage = errorBody.message
      }
    } catch (error) {
      // ignore json parse errors
    }

    if (response.status === 429 && response.headers.has('retry-after')) {
      const retryAfter = response.headers.get('retry-after')
      errorMessage = `Rate limited by API. Try again in ${retryAfter} seconds.`
    }
    throw new Error(errorMessage)
  }

  return response.json() as Promise<T>
}

export const searchAnime = async (
  params: SearchParams,
  signal?: AbortSignal,
): Promise<SearchResponse> => {
  const { query, page, filters } = params
  const trimmedQuery = query.trim()
  const searchMode = trimmedQuery.length > 0

  const searchParams = searchMode
    ? buildQuery({
        q: trimmedQuery,
        page,
        limit: 12,
        sfw: true,
        order_by: 'score',
        sort: 'desc',
        status: filters.status !== 'any' ? filters.status : undefined,
        type: filters.type !== 'any' ? filters.type : undefined,
        min_score: filters.minScore ?? undefined,
      })
    : buildQuery({ page, limit: 12 })

  const endpoint = searchMode
    ? `${BASE_URL}/anime?${searchParams}`
    : `${BASE_URL}/top/anime?${searchParams}`

  const response = await fetch(endpoint, { signal })
  const payload = await handleResponse<{ data: any[]; pagination: any }>(response)
  const paginationItems = payload.pagination?.items ?? {}

  return {
    pagination: {
      currentPage: payload.pagination?.current_page ?? 1,
      lastVisiblePage: payload.pagination?.last_visible_page ?? 1,
      hasNextPage: payload.pagination?.has_next_page ?? false,
      itemsPerPage: paginationItems.per_page ?? 12,
      totalItems: paginationItems.total,
    },
    data: payload.data.map(mapAnimeSummary),
  }
}

export const fetchAnimeDetail = async (id: number, signal?: AbortSignal) => {
  const response = await fetch(`${BASE_URL}/anime/${id}/full`, { signal })
  const payload = await handleResponse<{ data: any }>(response)
  return mapAnimeSummary(payload.data)
}

export const fetchTrendingAnime = async (signal?: AbortSignal) => {
  const response = await fetch(`${BASE_URL}/top/anime?limit=5`, { signal })
  const payload = await handleResponse<{ data: any[] }>(response)
  return payload.data.map(mapAnimeSummary)
}
