import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function SectionCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
      {[0, 1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-8 w-[120px]" />
          </CardHeader>
          <CardFooter>
            <Skeleton className="h-4 w-[150px]" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
