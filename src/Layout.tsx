import {SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./pages/component/AppSidebar"
import { Outlet } from "react-router"
import { Suspense } from "react"
import LoadingScreen from "./pages/LoadingScreen"

export default function Layout() {
  return (
   <SidebarProvider >
      <div className="flex h-screen w-screen">
        <AppSidebar />
        <div className="w-full h-full">
        <SidebarTrigger/>
        <Suspense fallback={<LoadingScreen msg='Page loaded'/>}>
          <Outlet/>
        </Suspense>
        </div>
      </div>
    </SidebarProvider>
  )
}