export interface Image {
  id: number
  src: string
  createdAt: string
  updatedAt: string
  postId?: number
}

export const BACKEND_HTTP = "http://localhost:4539/" as const
