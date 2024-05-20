import DataTable from '@/components/data-table.tsx'
import { columns } from '@/components/tasks/columns.tsx'
import { useAtom, useAtomValue } from 'jotai'
import tasksAtom from '@/stores/useTasksAtom.ts'
import { postsAtom } from '@/stores/usePostsAtom.ts'

export default function TasksPage() {
  const [tasks] = useAtom(tasksAtom)
  const posts = useAtomValue(postsAtom)
  console.log('posts in tasks', posts)

  return (
    <>
      <DataTable
        data={tasks}
        columns={columns}
        pagination={{
          show: true,
          sizes: [10, 50, 100, 500],
          state: {
            pageIndex: 0,
            pageSize: 10,
          },
        }}
        //      render={({ pageIndex, pageSize }) => (
        //        <div>
        //          hello {pageIndex}-{pageSize}
        //        </div>
        //      )}
      />
    </>
  )
}
