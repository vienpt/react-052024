import AppLayout from '@/components/app/app-layout.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import StoreProvider from './components/app/app-stores'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <AppLayout />
      </StoreProvider>
    </QueryClientProvider >
  )
}

export default App
