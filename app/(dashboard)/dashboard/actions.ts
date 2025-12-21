"use server"

import { getAuthenticatedUser, getOctokit } from "@/lib/octokit"

export async function getStats() {
  "use cache: private"

  const octokit = await getOctokit()
  const user = await getAuthenticatedUser()

  const thisYear = new Date().getFullYear()
  const yearStart = `${thisYear}-01-01T00:00:00Z`
  const yearEnd = `${thisYear}-12-31T23:59:59Z`

  const query = `
    query ($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
          totalRepositoriesWithContributedCommits
        }
        repositories {
          totalCount
        }
      }
    }
  `

  const data = await octokit.graphql<{
    user: {
      contributionsCollection: {
        totalCommitContributions: number
        totalPullRequestContributions: number
        totalPullRequestReviewContributions: number
        totalRepositoriesWithContributedCommits: number
      }
      repositories: {
        totalCount: number
      }
    }
  }>(query, {
    login: user.login,
    from: yearStart,
    to: yearEnd,
  })

  return {
    totalConnectedRepos: data.user.repositories.totalCount,
    totalCommits: data.user.contributionsCollection.totalCommitContributions,
    totalPullRequests:
      data.user.contributionsCollection.totalPullRequestContributions,
    totalReviews:
      data.user.contributionsCollection.totalPullRequestReviewContributions,
  }
}

function getLast12Months() {
  const months: { label: string; from: string; to: string }[] = []
  const now = new Date()

  for (let i = 11; i >= 0; i--) {
    const start = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 0)

    months.push({
      label: start.toLocaleString("default", { month: "long" }),
      from: start.toISOString().split("T")[0],
      to: end.toISOString().split("T")[0],
    })
  }

  return months
}

export async function getLast12MonthsActivity() {
  "use cache: private"

  const octokit = await getOctokit()
  const user = await getAuthenticatedUser()
  const months = getLast12Months()

  const query = `
    query ($login: String!) {
      user(login: $login) {
        ${months
          .map(
            (month, i) => `
          month${i}: contributionsCollection(from: "${month.from}T00:00:00Z", to: "${month.to}T23:59:59Z") {
            totalCommitContributions
            totalPullRequestContributions
          }
        `,
          )
          .join("\n")}
      }
    }
  `

  const data = await octokit.graphql<{
    user: {
      [key: string]: {
        totalCommitContributions: number
        totalPullRequestContributions: number
      }
    }
  }>(query, {
    login: user.login,
  })

  const results = months.map((month, i) => {
    const monthData = data.user[`month${i}`]
    return {
      month: month.label,
      commits: monthData.totalCommitContributions,
      prs: monthData.totalPullRequestContributions,
    }
  })

  const subtitle = `January - December ${new Date().getFullYear()}`

  return {
    stats: results,
    subtitle,
  }
}

// get user contributions heatmap

export type ContributionCalendar = {
  totalContributions: number
  weeks: {
    contributionDays: {
      date: string
      contributionCount: number
      color: string
    }[]
  }[]
}

function getContributionLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0
  if (count <= 4) return 1
  if (count <= 9) return 2
  if (count <= 14) return 3
  return 4
}

export async function getUserContributionsHeatmap() {
  "use cache: private"

  const octokit = await getOctokit()
  const user = await getAuthenticatedUser()

  const query = `
    query ($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `

  const data = await octokit.graphql<{
    user: {
      contributionsCollection: {
        contributionCalendar: ContributionCalendar
      }
    }
  }>(query, {
    login: user.login,
  })

  const weeks = data.user.contributionsCollection.contributionCalendar.weeks

  return weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: getContributionLevel(day.contributionCount),
    })),
  )
}
