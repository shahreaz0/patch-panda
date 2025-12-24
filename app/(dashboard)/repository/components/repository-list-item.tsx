import {
  CircleIcon,
  ClockIcon,
  GitForkIcon,
  GlobeIcon,
  LockIcon,
  StarIcon,
} from "@phosphor-icons/react/ssr"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { getRepositories } from "../actions"

type Props = {
  repository: Awaited<ReturnType<typeof getRepositories>>[number]
}

export function RepositoryListItem({ repository }: Props) {
  return (
    <Card className="hover:bg-accent/50 transition-colors">
      <CardHeader className="flex items-center gap-2">
        {repository.private ? (
          <LockIcon className="size-4 text-muted-foreground" />
        ) : (
          <GlobeIcon className="size-4 text-muted-foreground" />
        )}
        <h3 className="font-semibold text-foreground truncate max-w-[300px]">
          {repository.name}
        </h3>
        <Badge variant="outline" className="ml-1 uppercase text-[10px]">
          {repository.visibility}
        </Badge>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {repository.description || "No description provided"}
        </p>
      </CardContent>

      <CardFooter className="flex items-center gap-4 text-xs text-muted-foreground">
        {repository.language && (
          <div className="flex items-center gap-1">
            <CircleIcon
              className="size-3 fill-primary text-primary"
              weight="fill"
            />
            <span>{repository.language}</span>
          </div>
        )}

        <div className="flex items-center gap-1">
          <StarIcon className="size-3.5" />
          <span>{repository.stargazers_count}</span>
        </div>

        <div className="flex items-center gap-1">
          <GitForkIcon className="size-3.5" />
          <span>{repository.forks_count}</span>
        </div>

        <div className="flex items-center gap-1 ml-auto">
          <ClockIcon className="size-3.5" />
          <span>
            Updated{" "}
            {repository.updated_at
              ? formatDistanceToNow(new Date(repository.updated_at), {
                  addSuffix: true,
                })
              : "recently"}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}
