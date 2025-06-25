import SuperAdminDashboard from "@/features/superadmin/SuperAdminPage";
import SuperAdminAuthGuard from "@/hoc/SuperAdminAuthGuard";
import React from "react";

const DashboardSuperAdminPage = () => {
  return <div className="p-8"><SuperAdminDashboard/></div>;
};

export default SuperAdminAuthGuard(DashboardSuperAdminPage);
