import Iconify from "../../components/Icon/iconify";
import { Menu } from "../../interfaces/menu.interface";

export const menu: Menu[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    category: "Admin",
    path: "/dashboard",
    icon: () => <Iconify icon="" />,
  },
];
