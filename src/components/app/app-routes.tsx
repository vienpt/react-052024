import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '@/App.tsx'
import FormPage from '@/pages/form.tsx'
import TasksPage from '@/pages/tasks.tsx'
import TaskPage from '@/pages/task/index.tsx'
import Error from '@/Error.tsx'
import HomePage from '@/pages/home.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/form',
        element: <FormPage />,
      },
      {
        path: '/tasks',
        element: <TasksPage />,
        children: [],
      },
      {
        path: '/tasks/:id',
        element: <TaskPage />,
      },
    ],
  },
])

export default function AppRoutes() {
  return <RouterProvider router={router} />
}
