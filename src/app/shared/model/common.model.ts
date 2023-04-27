export interface IPageable<T> {
  data: Array<T>;
  meta: IPageableMeta;
}

export interface IPageableMeta {
  total_pages: number;
  current_page: number;
  next_page: any;
  per_page: number;
  total_count: number;
}
