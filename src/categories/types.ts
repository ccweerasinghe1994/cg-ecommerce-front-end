export type TCategory = {
  categoryId: number;
  categoryName: string;
};

export interface IPagination {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  lastPage: boolean;
}

export interface IApiResponse<T> extends IPagination {
  content: T;
}
