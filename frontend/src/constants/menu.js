export const sidebarMenu = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: "📊",
    roles: ["OWNER", "ADMIN", "MANAGER", "INVENTORY_MANAGER", "SALESPERSON"],
  },
  {
    title: "Products",
    path: "/products",
    icon: "📦",
    roles: ["OWNER", "ADMIN", "MANAGER", "INVENTORY_MANAGER", "SALESPERSON"],
  },
  {
    title: "Suppliers",
    path: "/suppliers",
    icon: "🚚",
    roles: ["OWNER", "ADMIN", "MANAGER", "INVENTORY_MANAGER"],
  },
  {
    title: "Purchases",
    path: "/purchases",
    icon: "🛒",
    roles: ["OWNER", "ADMIN", "MANAGER", "INVENTORY_MANAGER"],
  },
  {
    title: "Sales",
    path: "/sales",
    icon: "💰",
    roles: ["OWNER", "ADMIN", "MANAGER", "SALESPERSON"],
  },
  {
    title: "Staff & User Management",
    path: "/users",
    icon: "👥",
    roles: ["OWNER", "ADMIN"],
  },
];