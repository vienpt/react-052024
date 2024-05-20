import { useParams } from 'react-router-dom'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  fetchPostItemAtom,
  postIdAtom,
  postsAtom,
} from '@/stores/usePostsAtom.ts'

export default function PostDetailPage() {
  const setPostIdAtom = useSetAtom(postIdAtom)
  const postsItem = useAtomValue(postsAtom)

  const [{ data, isLoading }] = useAtom(fetchPostItemAtom)

  const params = useParams()
  const postId = params.id as string

  if (postId !== undefined) {
    const validItem = postsItem.findIndex((post) => post.id === +postId)
    if (validItem === -1)
      return (
        <>
          <p>Page not found</p>
        </>
      )
    setPostIdAtom(+postId)
  }

  if (isLoading) return <p>Loading post item...</p>

  return (
    <div>
      <p className="text-green-500">{postId}</p>
      <h1 className="text-3xl">
        <pre>{data?.title}</pre>
      </h1>
    </div>
  )
}
