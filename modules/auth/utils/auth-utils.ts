"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

export async function requireAuth() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user) {
      redirect("/login")
    }

    return true
  } catch (_error) {
    redirect("/login")
  }
}

export async function requireUnAuth() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (session?.user) {
      redirect("/")
    }

    return true
  } catch (_error) {
    redirect("/")
  }
}
