"use client"

import { CreditCardIcon } from "@phosphor-icons/react/dist/csr/CreditCard"
import { GearIcon } from "@phosphor-icons/react/dist/csr/Gear"
import { GitBranchIcon } from "@phosphor-icons/react/dist/csr/GitBranch"
import { GitPullRequestIcon } from "@phosphor-icons/react/dist/csr/GitPullRequest"
import { HouseSimpleIcon } from "@phosphor-icons/react/dist/csr/HouseSimple"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import { Skeleton } from "./ui/skeleton"

export const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: HouseSimpleIcon,
    isActive: true,
  },
  {
    title: "Repository",
    url: "/repository",
    icon: GitBranchIcon,
  },
  {
    title: "Reviews",
    url: "/reviews",
    icon: GitPullRequestIcon,
  },
  {
    title: "Subscription",
    url: "/subscription",
    icon: CreditCardIcon,
  },

  {
    title: "Settings",
    url: "/settings",
    icon: GearIcon,
  },
]

function NavListSkeleton() {
  return (
    <div>
      {navItems.map((item) => (
        <Skeleton key={item.url} className="m-1 h-8" />
      ))}
    </div>
  )
}

export function NavMain() {
  const pathname = usePathname()

  const session = useSession()

  if (!session) {
    return <NavListSkeleton />
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        {navItems
          .filter((_list) => {
            return true
          })
          .map((item) => (
            <SidebarMenuItem key={item.title} className="my-0.5">
              <Link href={item.url}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={pathname === item.url}
                  className="cursor-pointer"
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
