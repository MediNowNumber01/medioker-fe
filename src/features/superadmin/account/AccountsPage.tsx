
"use client";

import AccountsPageHeader from "./components/AccountsPageHeader";
import AccountsPageTable from "./components/AccountsPageTable";

export default function AccountsPage() {
  return (
    <div className="space-y-6">
      <AccountsPageHeader />
      <AccountsPageTable />
    </div>
  );
}