import {Link, NavLink, Outlet} from "react-router-dom";

export default function AppLayout() {
  return (
    <main className="flex flex-col items-center mx-auto container">
      <ul className="flex flex-row gap-10 h-[100px] items-center">
        <li>
          <NavLink to="/form" className={({ isActive }) => isActive ? 'text-blue-600' : ''}>
            Form
          </NavLink>
        </li>
        <li>
          <NavLink to="/tasks" className={({ isActive }) => isActive ? 'text-blue-600' : ''}>
            Tasks
          </NavLink>
        </li>
      </ul>

      <Outlet />

      <footer className="pt-10">
        <Link to={'/'}>Back to App</Link>
      </footer>
    </main>
  )
}