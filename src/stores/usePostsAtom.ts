import { atom } from 'jotai'
import { Post } from '@/lib/interface.ts'
import { atomWithQuery } from 'jotai-tanstack-query'

export const postsAtom = atom<Post[]>([])

export const postIdAtom = atom(1)

export const fetchPostItemAtom = atomWithQuery((get) => ({
  queryKey: ['posts', get(postIdAtom)],
  queryFn: async ({ queryKey: [, id], signal }): Promise<Post> => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      { signal },
    )
    if (!res.ok) {
      throw new Error(`Error fetching post item ${id}`)
    }

    const data = await res.json()
    // const computed = data.filter(heaveComputation) // custom filter, mapping here

    return data
  },
}))

export const fetchPostsAtom = atomWithQuery(() => ({
  queryKey: ['posts'],
  queryFn: async ({ signal }): Promise<Post[]> => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
      signal,
    })
    if (!res.ok) {
      throw new Error(`Error fetching list posts`)
    }

    const data = await res.json()

    console.log('fetch data posts')
    return data
  },
}))
