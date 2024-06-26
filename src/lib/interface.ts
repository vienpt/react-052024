export interface UniqueColumnItem {
  [key: string]: unknown
}

export interface Task extends UniqueColumnItem {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export interface Post extends UniqueColumnItem {
  body: string
  id: number
  title: string
  userId: number
}

export interface FetchError {
  error: string
  name: string // to maintain context error
}
