import { Outlet } from 'react-router-dom'
import AppFooter from '@/components/app/app-footer.tsx'
import AppHeader from '@/components/app/app-header.tsx'

export default function AppLayout() {
  return (
    <main className="mx-auto container">
      <AppHeader />
      <Outlet />
      <AppFooter />
    </main>
  )
}
