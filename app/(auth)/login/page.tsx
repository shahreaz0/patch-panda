import { LoginUI } from "@/modules/auth/components/login-ui"

export default function LoginPage() {
  return (
    <section className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md pb-10">
        <LoginUI />
      </div>
    </section>
  )
}
