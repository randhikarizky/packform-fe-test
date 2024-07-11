import { BaseResponse } from "./base.response";

export interface List<T> {
  data: T[];
  meta: BaseResponse;
}

export interface ListOptions<T> {
  data: T[];
}
