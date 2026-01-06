"use client"

import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import { debounce } from "nuqs"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { useRepositorySearchParams } from "../repository-search-params"

export function RepositoryFilters() {
  const { repositorySearchParams, setRepositorySearchParams, isLoading } =
    useRepositorySearchParams()

  return (
    <div className="flex gap-4 mb-6">
      <InputGroup className="max-w-sm">
        <InputGroupInput
          placeholder="Search repositories..."
          value={repositorySearchParams.q}
          onChange={(e) => {
            setRepositorySearchParams(
              (prev) => ({
                ...prev,
                q: e.target.value,
                page: 1,
              }),
              {
                limitUrlUpdates:
                  e.target.value === "" ? undefined : debounce(500),
              },
            )
          }}
        />

        <InputGroupAddon align="inline-end">
          {isLoading ? <Spinner /> : <MagnifyingGlassIcon />}
        </InputGroupAddon>
      </InputGroup>

      <Select
        value={repositorySearchParams.visibility ?? ""}
        onValueChange={(value) => {
          setRepositorySearchParams({
            ...repositorySearchParams,
            visibility: value,
            page: 1,
          })
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Visibility" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="private">Private</SelectItem>
          <SelectItem value="public">Public</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
