import AdminAccountsPage from "@/features/superadmin/account/admin/AdminPage";
import SuperAdminAuthGuard from "@/hoc/SuperAdminAuthGuard";
import UserGuestAuthGuard from "@/hoc/UserGuestAuthGuard";
import React from "react";

const page = () => {
  return (
    <div>
      <AdminAccountsPage />
    </div>
  );
};

export default SuperAdminAuthGuard(page);
