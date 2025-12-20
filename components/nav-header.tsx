import { headers } from "next/headers"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { auth } from "@/lib/auth"
import { generateAvatarUrl, getInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export async function NavHeader() {
  const user = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar>
            <AvatarImage
              className="rounded-none border-none"
              src={generateAvatarUrl(user?.user.name || "")}
            />
            <AvatarFallback className="text-xs font-light rounded-none">
              {getInitials(user?.user.name || "")}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user?.user.name}</span>
            <span className="truncate text-xs">{user?.user.email}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
