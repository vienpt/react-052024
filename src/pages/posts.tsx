import DataTable from '@/components/data-table.tsx'
import { useAtom, useSetAtom } from 'jotai'
import { PostColumns } from '@/components/posts/columns.tsx'
import { fetchPostsAtom, postsAtom } from '@/stores/usePostsAtom.ts'
import { Outlet } from 'react-router-dom'

export default function PostsPage() {
  const setPosts = useSetAtom(postsAtom)
  const [{ data, isLoading, error }] = useAtom(fetchPostsAtom)

  if (isLoading) return <p>Loading posts...</p>

  if (error) return <p>Error fetching posts: {error.message}</p>

  if (data) {
    setPosts(data)
  }

  return (
    <>
      <Outlet />
      <DataTable
        data={data ? data : []}
        columns={PostColumns}
        pagination={{
          show: true,
          sizes: [10, 50, 100, 500],
          state: {
            pageIndex: 0,
            pageSize: 50,
          },
        }}
      />
    </>
  )
}
