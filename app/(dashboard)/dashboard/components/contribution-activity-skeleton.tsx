import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ContributionActivitySkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-[180px]" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-[140px]" />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <Skeleton className="h-[160px] w-full" />
      </CardContent>
    </Card>
  )
}
