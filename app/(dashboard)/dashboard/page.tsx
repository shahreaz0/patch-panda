import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { ContributionActivity } from "./components/contribution-activity"
import { ContributionActivitySkeleton } from "./components/contribution-activity-skeleton"
import { MonthlyActivity } from "./components/monthly-activity"
import { MonthlyActivitySkeleton } from "./components/monthly-activity-skeleton"
import { SectionCardsSkeleton } from "./components/stat-skeleton"
import { SectionCards } from "./components/stats"

export default function DashboardPage() {
  return (
    <main className="container mx-auto space-y-4">
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<SectionCardsSkeleton />}>
          <SectionCards />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<MonthlyActivitySkeleton />}>
          <MonthlyActivity />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<ContributionActivitySkeleton />}>
          <ContributionActivity />
        </Suspense>
      </ErrorBoundary>
    </main>
  )
}
