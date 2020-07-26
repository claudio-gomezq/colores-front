export default interface PaginateResponseModel<M> {
  items: M[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}
