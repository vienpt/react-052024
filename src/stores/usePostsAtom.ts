import { atom } from 'jotai'
import { Post } from '@/lib/interface.ts'
import { atomWithQuery } from 'jotai-tanstack-query'
import { fetchData } from '@/lib/utils'
import { store } from '.'

export const postIdAtom = atom(1)
export const postsAtom = atom<Post[]>([])

export const derivedPostsAtom = atom(
  (get) => {
    const { data } = get(fetchPostsAtom)
    return data
  },
  (_, set, newPosts) => set(postsAtom, newPosts as Post[]),
)

export const fetchPostItemAtom = atomWithQuery((get) => ({
  queryKey: ['posts', get(postIdAtom)],
  queryFn: async ({ queryKey: [, id] }): Promise<Post | null> => {
    const data = await fetchData<Post>({
      url: `https://jsonplaceholder.typicode.com/posts/${id}`,
      name: 'post',
    })

    if ('error' in data) {
      // Handle error scenario (e.g., display error message)
      console.error(data.error)
      return null
    }

    return data
  },
}))

export const fetchPostsAtom = atomWithQuery(() => ({
  queryKey: ['posts'],
  queryFn: async (): Promise<Post[] | null> => {
    const data = await fetchData<Post[]>({
      url: 'https://jsonplaceholder.typicode.com/posts',
      name: 'posts',
    })

    if ('error' in data) {
      // Handle error scenario (e.g., display error message)
      console.error(data.error)
      return null
    }

    store.set(postsAtom, data)

    return data
  },
}))
