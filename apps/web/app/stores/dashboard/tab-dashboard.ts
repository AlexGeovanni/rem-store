import { Boxes } from "lucide-react";
import { create } from "zustand";
import { persist } from "zustand/middleware";


export const TABS_LAYOUT = {
  DASHBOARD: "DASHBOARD",
  PRODUCTS: "PRODUCTS",
  ORDERS: "ORDERS",
} as const;

export const TABS_MENU = {
  DASHBOARD: "DASHBOARD",
  PRODUCTS_LIST: "PRODUCTS_LIST", 
  PRODUCTS_CREATE: "PRODUCTS_CREATE",
  ORDERS_LIST: "ORDERS_LIST",
} as const;

export type TabValueLayout = (typeof TABS_LAYOUT)[keyof typeof TABS_LAYOUT];
export type TabValueMenu = (typeof TABS_MENU)[keyof typeof TABS_MENU];

export const TAB_ARRAY: TabValueLayout[] = Object.values(TABS_LAYOUT) ;
export const TAB_ARRAY_MENU: TabValueMenu[] = Object.values(TABS_MENU);

// Valores por defecto
const DEFAULT_TAB_ASIDE: TabValueLayout = TABS_LAYOUT.DASHBOARD;
const DEFAULT_TAB_MENU: TabValueMenu = TABS_MENU.DASHBOARD;

interface DataSidebar {
  id: TabValueLayout;
  title: string;
  url: string;
  icon: React.ComponentType<any>;
  childrenTab: {
    id: TabValueMenu;
    title: string;
    url: string;
  }[];
}

export const DATA_SIDEBAR:DataSidebar[] = [
  {
    id: TABS_LAYOUT.PRODUCTS,
    title: "Productos",
    url: "/dashboard/product",
    icon: Boxes,
    // isActive: true
    childrenTab: [
      {
        id: TABS_MENU.PRODUCTS_LIST,
        title: "Listado",
        url: "/dashboard/product",
      },
      {
        id: TABS_MENU.PRODUCTS_CREATE,
        title: "Nuevo producto",
        url: "/dashboard/product/create",
      },
    ],
  },
  // {
  //   id: TABS_LAYOUT.ORDERS,
  //   title: "Pedidos",
  //   url: "/dashboard/pedidos",
  //   icon: ListTodo,
  //   childrenTab: [
  //     {
  //       id: TABS_MENU.ORDERS_LIST,
  //       title: "Listado",
  //       url: "/dashboard/pedidos",
  //     },
  //   ],
  // },
];

interface TabState {
  tabAside: TabValueLayout;
  tabMenu: TabValueMenu;
  setTabAside: (tab: TabValueLayout, menu: TabValueMenu) => void;
  resetTabs: () => void;
}

export const useTabStore = create<TabState>()(
  persist(
    (set) => ({
      tabAside: DEFAULT_TAB_ASIDE,
      tabMenu: DEFAULT_TAB_MENU,

      setTabAside: (tab, menu) =>
        set({
          tabAside: tab,
          tabMenu: menu,
        }),

      resetTabs: () =>
        set({
          tabAside: DEFAULT_TAB_ASIDE,
          tabMenu: DEFAULT_TAB_MENU,
        }),
    }),
    {
      name: "dashboard-tabs-storage",
    }
  )
);

