import AdminAccountsPage from "@/features/superadmin/account/admin/AdminPage";
import SuperAdminAuthGuard from "@/hoc/SuperAdminAuthGuard";
import React from "react";

const admins = () => {
  return (
    <div className="p-8">
      <AdminAccountsPage />
    </div>
  );
};

export default SuperAdminAuthGuard(admins);
