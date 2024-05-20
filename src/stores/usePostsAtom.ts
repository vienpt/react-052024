import { atom } from 'jotai'
import { Post } from '@/lib/interface.ts'
import useQueryFetchData from '@/hooks/useFetchData.ts'

export const postsAtom = atom<Post[]>([])

export const fetchPostsAtom = () => {
  return useQueryFetchData({
    url: 'https://jsonplaceholder.typicode.com/posts',
    key: 'posts',
  })
}
