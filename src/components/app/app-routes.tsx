import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '@/App.tsx'
import FormPage from '@/pages/form.tsx'
import TasksPage from '@/pages/tasks.tsx'
import TaskPage from '@/pages/task/index.tsx'
import Error from '@/Error.tsx'
import HomePage from '@/pages/home.tsx'
import PostsPage from '@/pages/posts.tsx'
import PostDetailPage from '@/pages/post'

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
      },
      {
        path: '/tasks/:id',
        element: <TaskPage />,
      },
      {
        path: '/posts',
        element: <PostsPage />,
        children: [
          {
            path: '/posts/:id',
            element: <PostDetailPage />
          }
        ]
      },
    ],
  },
])

export default function AppRoutes() {
  return <RouterProvider router={router} />
}
