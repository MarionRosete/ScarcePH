import {SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./pages/component/AppSidebar"
import { Outlet } from "react-router"
import { Suspense } from "react"
import LoadingScreen from "./pages/LoadingScreen"

export default function Layout() {
  return (
   <SidebarProvider >
        <AppSidebar />
        <Suspense fallback={<LoadingScreen msg='Page loaded'/>}>
          <Outlet/>
        </Suspense>
    </SidebarProvider>
  )
}