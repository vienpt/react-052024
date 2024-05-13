import {NavLink, Outlet} from "react-router-dom";
import { useState } from "react";

export default function TasksPage() {
  const [data] = useState(Array.from({ length: 5 }).map((_, i) => i));
  return (
    <div>
      <h1 className="text-5xl">TasksPage</h1>
      {data.map((_, index) =>
        <NavLink key={`task-${index}`} to={`/tasks/${index}`} className={({ isActive}) => isActive ? 'text-green-500' : ''}>
          {`Task-${index}`}
        </NavLink>
      )}

      {/* render task detail page */}
      <Outlet />
    </div>
  )
}