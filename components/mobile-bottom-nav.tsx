"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navItems } from "./nav-main"

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Primary mobile"
      className="fixed inset-x-0 bottom-0 z-50 block md:hidden"
    >
      <div className="mx-auto max-w-5xl px-safe w-full">
        <div className="backdrop-blur-sm bg-card/80 border-t border-border flex justify-between items-center px-4 py-2 rounded-t-lg overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.url}
                href={item.url}
                className={cn(
                  "flex flex-col items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground min-w-[64px]",
                  pathname === item.url && "text-primary outline-none",
                )}
                aria-label={item.title}
                title={item.title}
              >
                <Icon className="h-5 w-5" aria-hidden={true}>
                  <title>{item.title}</title>
                </Icon>
                <span className="sr-only">{item.title}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
