export default interface PaginateResponse<M> {
  items: M[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}
