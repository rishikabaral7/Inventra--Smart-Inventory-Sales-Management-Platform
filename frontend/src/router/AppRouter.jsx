import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Products from "../pages/Products/Products";
import Suppliers from "../pages/Suppliers/Suppliers";
import Purchases from "../pages/Purchases/Purchases";
import Sales from "../pages/Sales/Index";
import Users from "../pages/Users/Users";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
import NotFound from "../pages/NotFound/NotFound";

import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";

const ALL_ROLES = ["OWNER", "ADMIN", "MANAGER", "INVENTORY_MANAGER", "SALESPERSON"];
const PRODUCT_ROLES = ["OWNER", "ADMIN", "MANAGER", "INVENTORY_MANAGER", "SALESPERSON"];
const PROCUREMENT_ROLES = ["OWNER", "ADMIN", "MANAGER", "INVENTORY_MANAGER"];
const SALES_ROLES = ["OWNER", "ADMIN", "MANAGER", "SALESPERSON"];
const STAFF_MGMT_ROLES = ["OWNER", "ADMIN"];

const ProtectedPage = ({ children, allowedRoles }) => (
  <ProtectedRoute allowedRoles={allowedRoles}>
    <DashboardLayout>
      {children}
    </DashboardLayout>
  </ProtectedRoute>
);

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedPage allowedRoles={ALL_ROLES}>
              <Dashboard />
            </ProtectedPage>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedPage allowedRoles={PRODUCT_ROLES}>
              <Products />
            </ProtectedPage>
          }
        />

        <Route
          path="/sales"
          element={
            <ProtectedPage allowedRoles={SALES_ROLES}>
              <Sales />
            </ProtectedPage>
          }
        />

        <Route
          path="/suppliers"
          element={
            <ProtectedPage allowedRoles={PROCUREMENT_ROLES}>
              <Suppliers />
            </ProtectedPage>
          }
        />

        <Route
          path="/purchases"
          element={
            <ProtectedPage allowedRoles={PROCUREMENT_ROLES}>
              <Purchases />
            </ProtectedPage>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedPage allowedRoles={STAFF_MGMT_ROLES}>
              <Users />
            </ProtectedPage>
          }
        />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
