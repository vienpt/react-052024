import DataTable from '@/components/data-table.tsx'
import { columns } from '@/components/tasks/columns.tsx'
import { useAtom } from 'jotai'
import tasksAtom from '@/stores/useTasksAtom.ts'

export default function TasksPage() {
  const [tasks] = useAtom(tasksAtom)

  return (
    <>
      <DataTable
        data={tasks}
        columns={columns}
        pagecount={10}
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
