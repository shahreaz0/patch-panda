import { redirect } from "next/navigation"
import { requireAuth } from "@/modules/auth/utils/auth-utils"

export default async function Page() {
  await requireAuth()

  return redirect("/dashboard")
}
