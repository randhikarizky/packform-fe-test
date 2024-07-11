import { ReactNode } from "react";

export interface Menu {
  id: string;
  title: string;
  path: string;
  category?: string;
  icon?: React.FunctionComponent;
  badge?: ReactNode;
  key?: string | string[];
  children?: MenuChildren[];
}

export interface MenuChildren {
  id: string;
  title: string;
  path: string;
  badge?: ReactNode;
  key?: string | string[];
  children?: MenuChildren[];
}

export interface DetailTabs {
  id?: string;
  route: number;
  label: string;
}
