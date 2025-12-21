import { AppSidebar } from "@/components/app-sidebar"
import DashboardHeader from "@/components/dashboard-header"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { requireAuth } from "@/modules/auth/utils/auth-utils"

export default async function DashboardLayout({ children }: LayoutProps<"/">) {
  await requireAuth()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />

        <main className="p-4">{children}</main>
      </SidebarInset>
      <MobileBottomNav />
    </SidebarProvider>
  )
}
