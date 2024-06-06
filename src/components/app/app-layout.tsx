import { Outlet } from 'react-router-dom'
import AppFooter from '@/components/app/app-footer.tsx'
import AppHeader from '@/components/app/app-header.tsx'
import { Toaster } from '@/components/ui/toaster'

export default function AppLayout() {
  return (
    <main className="mx-auto container">
      <AppHeader />
      <Outlet />
      <AppFooter />
      <Toaster />
    </main>
  )
}
