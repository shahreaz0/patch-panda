"use client"

import { GithubLogoIcon } from "@phosphor-icons/react/dist/csr/GithubLogo"
import { SpinnerIcon } from "@phosphor-icons/react/dist/csr/Spinner"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { signIn } from "@/lib/auth-client"

export function LoginUI() {
  const [isLoading, setIsLoading] = useState(false)

  async function loginHandler() {
    await signIn.social(
      {
        provider: "github",
        callbackURL: "/",
      },
      {
        onRequest: () => {
          setIsLoading(true)
        },
        onResponse: () => {
          setIsLoading(false)
        },
      },
    )
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          className="w-full bg-[#24292e] cursor-pointer"
          onClick={loginHandler}
          disabled={isLoading}
        >
          {isLoading ? (
            <SpinnerIcon className="mr-1 h-5 w-5 animate-spin" />
          ) : (
            <GithubLogoIcon className="mr-1 h-5 w-5" />
          )}
          Sign in with Github
        </Button>
      </CardContent>
    </Card>
  )
}
