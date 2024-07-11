export interface SelectOption<T = any> {
  value: any;
  label: string;
  data?: T;
}

export interface FilterOption {
  search_value: any;
  search_attribute: string;
  label: string;
}
