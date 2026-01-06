import { ShoppingCartIcon, Footprints, LayoutDashboardIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { NavLink } from "react-router"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: ShoppingCartIcon,
  },
  {
    title: "Pairs",
    url: "/pairs",
    icon: Footprints,
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="">
        <div className="mb-6 flex items-center gap-3 rounded-xl bg-muted/50 p-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">Admin</span>
            <span className="text-xs text-muted-foreground">
              Administrator
            </span>
          </div>
        </div>
        <SidebarGroup>
     
          <SidebarGroupContent>
             <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <NavLink to={item.url} end>
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
