"use client"
import { ChevronDown, Home, Package, Pill, Store, User, UserCheck, Users, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"

function getInitials(name?: string | null): string {
  if (!name) return "SA"
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

// Menu items
const items = [
  {
    type: "single" as const,
    title: "Dashboard",
    url: "/superadmin",
    icon: Home,
  },
  {
    type: "single" as const,
    title: "Pharmacies",
    url: "/superadmin/pharmacies",
    icon: Store,
  },
  {
    type: "group" as const,
    title: "Products",
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
    type: "group" as const,
    title: "Accounts",
    icon: Users,
    subItem: [
      {
        title: "All Accounts",
        url: "/superadmin/accounts",
      },
      {
        title: "Admins",
        url: "/superadmin/accounts/admins",
        icon: UserCheck,
      },
      {
        title: "Users",
        url: "/superadmin/accounts/users",
        icon: User,
      },
    ],
  },
  {
    type: "single" as const,
    title: "Stock Management",
    url: "/superadmin/stocks",
    icon: Package,
  },
]

export function SuperAdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()

  // Don't render if loading or not authorized
  if (status === "loading") return null
  if (!session || session.user?.role !== "SUPER_ADMIN") return null

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false })
      router.push("/login")
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  return (
    <Sidebar className="border-r">
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => {
                if (item.type === "group") {
                  const isActive = item.subItem?.some((subItem) => pathname === subItem.url)
                  const isParentActive = pathname.includes(`/superadmin/${item.title.toLowerCase().replace(" ", "")}`)

                  return (
                    <Collapsible
                      key={item.title}
                      defaultOpen={isActive || isParentActive}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            className={cn(
                              "w-full justify-between hover:bg-accent hover:text-accent-foreground",
                              (isActive || isParentActive) && "bg-accent text-accent-foreground",
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <item.icon className="h-4 w-4" />
                              <span>{item.title}</span>
                            </div>
                            <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub className="ml-4 mt-1 space-y-1">
                            {item.subItem?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname === subItem.url}
                                  className="w-full justify-start"
                                >
                                  <Link href={subItem.url}>
                                    {subItem.icon && <subItem.icon className="h-4 w-4" />}
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  )
                } else {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={pathname === item.url} className="w-full justify-start">
                        <Link href={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                }
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t px-4 py-4 space-y-4">
        {/* User Profile Section */}
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session.user?.profilePict || undefined} alt={session.user?.fullName || "Super Admin"} />
            <AvatarFallback className="text-xs">{getInitials(session.user?.fullName)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-medium truncate">{session.user?.fullName || "Super Admin"}</span>
            <span className="text-xs text-muted-foreground truncate">{session.user?.email || "admin@medinow.com"}</span>
          </div>
        </div>

        {/* Sign Out Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleSignOut}
          className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
