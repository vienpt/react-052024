import { atom } from 'jotai'
import { Task } from '@/lib/interface.ts'

const tasksAtom = atom<Task[]>([
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
])

export default tasksAtom
