import { NavLink } from 'react-router-dom'

export default function AppHeader() {
  return (
    <ul className="flex flex-row gap-10 h-[100px] items-center">
      <li>
        <NavLink
          to="/form"
          className={({ isActive }) => (isActive ? 'text-blue-600' : '')}
        >
          Form
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/tasks"
          className={({ isActive }) => (isActive ? 'text-blue-600' : '')}
        >
          Tasks
        </NavLink>
      </li>
    </ul>
  )
}
