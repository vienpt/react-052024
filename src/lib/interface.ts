
export interface UniqueColumnItem {
  [key: string]: unknown
}

export interface Task extends UniqueColumnItem {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}