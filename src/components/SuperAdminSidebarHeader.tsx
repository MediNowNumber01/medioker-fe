"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function getBreadcrumbFromPath(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length <= 1) return "Dashboard";

  const lastSegment = segments[segments.length - 1];
  switch (lastSegment) {
    case "pharmacies":
      return "Pharmacies";
    case "products":
      return "Products";
    case "categories":
      return "Categories";
    case "accounts":
      return "Accounts";
    case "admin":
      return "Admin Accounts";
    case "user":
      return "User Accounts";
    case "stocks":
      return "Stock Management";
    default:
      return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  }
}

export function SuperAdminHeader() {
  const pathname = usePathname();

  return (
    <div className="border-b sticky top-0 z-50 bg-background">
      
      <div className="flex h-16 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/superadmin">Super Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{getBreadcrumbFromPath(pathname)}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
