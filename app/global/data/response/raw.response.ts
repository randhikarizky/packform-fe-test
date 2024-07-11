import { BaseResponse } from './base.response';

export interface ListDTO<T> extends BaseResponse {
  code: number;
  data: T[];
  meta: {
    current_page: number;
    showing: number;
    total: number;
    total_pages: number;
  };
}

export interface SingleDTO<T> extends BaseResponse {
  data: T;
  id: string;
}
