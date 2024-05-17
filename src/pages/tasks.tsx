import DataTable from '@/components/data-table.tsx'
import { columns, tasks } from '@/components/tasks/columns.tsx'

export default function TasksPage() {
  return (
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
  )
}
