import DataTable from '@/components/data-table.tsx'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { PostColumns } from '@/components/posts/columns.tsx'
import { fetchPostsAtom, postsAtom } from '@/stores/usePostsAtom.ts'

export default function PostsPage() {
  const [posts, setPosts] = useAtom(postsAtom)
  const { isLoading, error, data } = fetchPostsAtom()
  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  if (isLoading) return <p>Loading posts...</p>;

  if (error) return <p>Error fetching posts: {error.message}</p>;

  return (
    <>
      <DataTable
        data={posts}
        columns={PostColumns}
        pagecount={10}
        pagination={{
          show: true,
          sizes: [10, 50, 100, 500],
          state: {
            pageIndex: 0,
            pageSize: 10,
          },
        }}
      />
    </>
  )
}
