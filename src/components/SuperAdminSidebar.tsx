"use client";
import { Home, Package, Pill, Store } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

// Menu items.
const items = [
  {
    type: "single",
    title: "Home",
    url: "/superadmin",
    icon: Home,
  },
  {
    type: "single",
    title: "Pharmacies",
    url: "/superadmin/pharmacies",
    icon: Store,
  },
  {
    type: "group",
    title: "Product",
    icon: Pill,
    subItem: [
      {
        title: "All Products",
        url: "/superadmin/products",
      },
      {
        title: "Categories",
        url: "/superadmin/categories",
      },
    ],
  },
  {
    type: "single",
    title: "Stock",
    url: "/superadmin/stocks",
    icon: Package,
  },
];

export function SuperAdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  if (!session || session.user?.role !== "SUPER_ADMIN") return null;

  return (
    <Sidebar className="z-50">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                if (item.type === "group") {
                  return (
                    <Collapsible
                      key={item.title}
                      defaultOpen
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton>
                            <item.icon />
                            <div>{item.title}</div>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subItem?.map((subItem) => (
                              <SidebarMenuSubItem
                                key={subItem.title}
                                className={cn(
                                  pathname === subItem.url
                                    ? "bg-muted rounded-md px-2"
                                    : "hover:bg-muted  rounded-md px-2 hover:underline",
                                  "justify-start"
                                )}
                              >
                                <Link
                                  href={subItem.url}
                                  aria-disabled={subItem.url === pathname}
                                >
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                } else {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          pathname === item.url
                            ? "bg-muted "
                            : "hover:bg-transparent hover:underline",
                          "justify-start"
                        )}
                      >
                        <Link
                          href={item.url || "#"}
                          aria-disabled={item.url === "/superadmin/search"}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
