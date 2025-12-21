import { requireUnAuth } from "@/lib/auth-utils"
import { LoginUI } from "./components/login-ui"

export default async function LoginPage() {
  await requireUnAuth()

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md pb-10">
        <LoginUI />
      </div>
    </section>
  )
}
