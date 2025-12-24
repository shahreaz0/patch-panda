import { useQueryStates } from "nuqs"
import { createLoader, parseAsFloat, parseAsString } from "nuqs/server"
import React from "react"

export const _repositorySearchParams = {
  page: parseAsFloat.withDefault(1),
  perPage: parseAsFloat.withDefault(10),
  q: parseAsString.withDefault(""),
  visibility: parseAsString.withDefault("all"),
}

export const loadRepositorySearchParams = createLoader(_repositorySearchParams)

export function useRepositorySearchParams() {
  const [isLoading, startTransition] = React.useTransition()

  const [repositorySearchParams, setRepositorySearchParams] = useQueryStates(
    _repositorySearchParams,
    {
      startTransition,
      shallow: false,
    },
  )

  return {
    repositorySearchParams,
    setRepositorySearchParams,
    isLoading,
  }
}
