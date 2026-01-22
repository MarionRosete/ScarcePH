import {
  ShoppingCartIcon,
  Footprints,
  LayoutDashboardIcon,
  SettingsIcon,
  ChevronDown,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

import { NavLink, useLocation } from "react-router"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"


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

const settings = [
  {
    title: "Change Password",
    url:"/settings/change-password"
  }
]

export function AppSidebar() {
  const location = useLocation()
  const isSettingsRoute = location.pathname.startsWith("/settings")

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>

        < div className="mb-6 flex items-center gap-3 rounded-xl bg-muted/50 p-3">
           <img 
              src="/image/ScarceLogo.PNG "
              className="w-10 rounded-sm object-fit rounded-md object-fit"
            />
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

              <Collapsible
                defaultOpen={isSettingsRoute}
                className="group/collapsible"
              >
                <SidebarMenuItem>

                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="justify-between">

                      <div className="flex items-center gap-2">
                        <SettingsIcon />
                        <span>Settings</span>
                      </div>

                      <ChevronDown
                        className="
                          h-4 w-4 transition-transform duration-300
                          group-data-[state=open]/collapsible:rotate-180
                        "
                      />

                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent
                    className="
                      data-[state=open]:animate-in
                      data-[state=closed]:animate-out
                      data-[state=closed]:fade-out-0
                      data-[state=open]:fade-in-0
                      data-[state=closed]:slide-out-to-top-1
                      data-[state=open]:slide-in-from-top-1
                    "
                  >
                    <SidebarMenuSub>
                      {settings.map((settings)=>
                      <SidebarMenuSubItem>
                        <NavLink
                          to={settings.url}
                          end
                        >
                          {({ isActive }) => (
                            <SidebarMenuSubButton
                              isActive={isActive}
                            >
                              <span>{settings.title}</span>
                            </SidebarMenuSubButton>
                          )}
                        </NavLink>
                      </SidebarMenuSubItem>
                      )}
                  
                    </SidebarMenuSub>
                  </CollapsibleContent>

                </SidebarMenuItem>
              </Collapsible>

            </SidebarMenu>

          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  )
}
