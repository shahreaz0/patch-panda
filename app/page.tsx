import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { requireAuth } from "@/modules/auth/utils/auth-utils"
import { getUserContributions } from "@/modules/github/lib/octokit"

export default async function Page() {
  await requireAuth()

  const contributions = await getUserContributions()

  console.log(contributions)

  async function signOutHandler() {
    "use server"

    await auth.api.signOut({
      headers: await headers(),
    })

    redirect("/login")
  }

  return (
    <section>
      <h1>Dashboard</h1>

      <form action={signOutHandler}>
        <Button>Sign out</Button>
      </form>
    </section>
  )
}
