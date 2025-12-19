import { LoginUI } from "@/modules/auth/components/login-ui"
import { requireUnAuth } from "@/modules/auth/utils/auth-utils"

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
