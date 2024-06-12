export interface Pagination<T> {
  total: number;
  current: number;
  next: number;
  preview: number;
  results: T[];
}
