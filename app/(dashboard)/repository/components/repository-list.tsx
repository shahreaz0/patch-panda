import type { getRepositories } from "../actions"
import { RepositoryListItem } from "./repository-list-item"
import { RepositoryPagination } from "./repository-pagination"

type Props = {
  repositoriesPromise: ReturnType<typeof getRepositories>
}

export async function RepositoryList({ repositoriesPromise }: Props) {
  const { items, totalCount } = await repositoriesPromise

  return (
    <>
      <div className="grid grid-cols-1 items-start content-start md:grid-cols-2 gap-4 h-[calc(100vh-200px)] overflow-auto p-0.5">
        {items.map((repo) => (
          <RepositoryListItem key={repo.id} repository={repo} />
        ))}
      </div>

      {totalCount > 0 && <RepositoryPagination totalCount={totalCount} />}
    </>
  )
}
