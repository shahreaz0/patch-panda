import type { getRepositories } from "../actions"
import { RepositoryListItem } from "./repository-list-item"

type Props = {
  repositoriesPromise: ReturnType<typeof getRepositories>
}

export async function RepositoryList({ repositoriesPromise }: Props) {
  const repositories = await repositoriesPromise

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {repositories.map((repo) => (
        <RepositoryListItem key={repo.id} repository={repo} />
      ))}
    </div>
  )
}
