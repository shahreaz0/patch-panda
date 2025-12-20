"use client"

import { EyeIcon } from "@phosphor-icons/react/dist/csr/Eye"
import { EyeClosedIcon } from "@phosphor-icons/react/dist/csr/EyeClosed"
import { LockIcon } from "@phosphor-icons/react/dist/csr/Lock"
import { useState } from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export function PasswordInput({
  type,
  ...props
}: React.ComponentProps<typeof InputGroupInput>) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <InputGroup>
      <InputGroupInput
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        {...props}
      />
      <InputGroupAddon>
        <LockIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        {showPassword ? (
          <EyeIcon
            className="cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          <EyeClosedIcon
            className="cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </InputGroupAddon>
    </InputGroup>
  )
}
