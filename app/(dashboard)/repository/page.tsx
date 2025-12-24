import type { Metadata } from "next"
import { getRepositories } from "./actions"
import { RepositoryFilters } from "./components/repository-filters"
import { RepositoryList } from "./components/repository-list"
import { loadRepositorySearchParams } from "./repository-search-params"

export const metadata: Metadata = {
  title: "Repository",
  description: "Repository",
}

export default async function RepositoryPage(props: PageProps<"/repository">) {
  const query = await loadRepositorySearchParams(props.searchParams)

  const repositoriesPromise = getRepositories(query)

  return (
    <section>
      <RepositoryFilters />
      <RepositoryList repositoriesPromise={repositoriesPromise} />
    </section>
  )
}
