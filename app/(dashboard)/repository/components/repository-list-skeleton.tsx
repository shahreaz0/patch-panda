import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function RepositoryListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {["1", "2", "3", "4", "5", "6"].map((id) => (
        <Card key={id} className="overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <Skeleton className="size-4 shrink-0" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-12 ml-1" />
          </CardHeader>

          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </CardContent>

          <CardFooter className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Skeleton className="size-3" />
              <Skeleton className="h-3 w-12" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="size-3.5" />
              <Skeleton className="h-3 w-8" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="size-3.5" />
              <Skeleton className="h-3 w-8" />
            </div>
            <Skeleton className="h-3 w-24 ml-auto" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
