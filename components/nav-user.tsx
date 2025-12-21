"use client"

import { CaretUpDownIcon } from "@phosphor-icons/react/dist/csr/CaretUpDown"
import { SealCheckIcon } from "@phosphor-icons/react/dist/csr/SealCheck"
import { SignOutIcon } from "@phosphor-icons/react/dist/csr/SignOut"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { signOut, useSession } from "@/lib/auth-client"
import { generateAvatarUrl } from "@/lib/utils"
import { Skeleton } from "./ui/skeleton"

export function UserInfoSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="h-8 w-8 rounded-lg" />

      <div className="grid flex-1 text-left text-sm leading-tight gap-y-0.5">
        <Skeleton className="h-4 w-[120px]" /> {/* Name */}
        <Skeleton className="h-3 w-[180px]" /> {/* Email */}
      </div>
    </div>
  )
}

export function NavUser() {
  const { isMobile } = useSidebar()

  const router = useRouter()
  const { data: session } = useSession()

  if (!session) return <UserInfoSkeleton />

  const user = session.user

  function logoutHandler() {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login")
        },
      },
    })
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {session ? (
                <>
                  <Avatar>
                    <AvatarImage
                      src={generateAvatarUrl(user.name)}
                      alt={user.email}
                      className="rounded-none"
                    />
                    <AvatarFallback className="rounded-none">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </>
              ) : (
                <UserInfoSkeleton />
              )}

              <CaretUpDownIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar>
                  <AvatarImage
                    src={generateAvatarUrl(user.name)}
                    alt={user.name}
                    className="rounded-none"
                  />
                  <AvatarFallback className="rounded-none">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <Link href="/profile">
                <DropdownMenuItem>
                  <SealCheckIcon />
                  Profile
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logoutHandler}>
              <SignOutIcon />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
