import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { FetchError } from './interface'

interface FetchDataProps {
  url: string
  name: string
  signal?: AbortSignal
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchData<T>({
  url,
  name,
}: FetchDataProps): Promise<T | FetchError> {
  try {
    const controller = new AbortController()
    const signal = controller.signal
    const response = await fetch(url, { signal })

    if (!response.ok) {
      return {
        error: `Failed while trying to fetch ${url} ${response.status ?? null}`,
        name,
      }
    }
    return await response.json()
  } catch (err) {
    const error = err as Error
    if (error.name === 'AbortError') {
      console.error(`Error aborted by ${name} data`)
    } else {
      console.error(`Error fetching ${name} data:`, error)
    }

    throw error // Re-throw the error for potential handling by the atomWithQuery
  }
}
