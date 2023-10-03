export interface ApiResponse<T> {
  user: T
  error?: string
}