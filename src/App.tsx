import AppLayout from '@/components/app/app-layout.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout></AppLayout>
    </QueryClientProvider>
  )
}

export default App
