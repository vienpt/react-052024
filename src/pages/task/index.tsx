import { useParams } from 'react-router-dom'
import {tasks} from "@/components/tasks/columns.tsx";

export default function TaskPage() {
  const params = useParams()
  const taskId = params.id as string
  console.log('taskId', taskId)
  const item = tasks.find(task => task.id === taskId)

  if (item !== undefined) {
    return (
      <div>
        <h1 className="text-2xl">Task details page</h1>
        {taskId}
      </div>
    )
  }

  return <>Empty</>
}
