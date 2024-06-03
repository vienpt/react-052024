import DataTable from '@/components/data-table.tsx'
import { useAtom } from 'jotai'
import { PostColumns } from '@/components/posts/columns.tsx'
import { fetchPostsAtom } from '@/stores/usePostsAtom.ts'
import { Outlet } from 'react-router-dom'
import TabItems from '@/components/posts/tab-items'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export default function PostsPage() {
  // const setPosts = useSetAtom(postsAtom)
  const [{ data, isLoading, error }] = useAtom(fetchPostsAtom)

  if (isLoading) return <p>Loading posts...</p>

  if (error) return <p>{error.message}</p>

  // if (data) {
  //   setPosts(data)
  // }

  return (
    <>
      <Outlet />
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <TabItems />
      </Dialog>

      <DataTable
        data={data || []}
        columns={PostColumns}
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
