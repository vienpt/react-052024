import { store } from '@/stores'
import { Provider } from 'jotai'

interface StoreProviderProps {
  children: React.ReactNode
}

export default function StoreProvider({ children }: StoreProviderProps) {
  return <Provider store={store}>
    {children}
  </Provider>
}