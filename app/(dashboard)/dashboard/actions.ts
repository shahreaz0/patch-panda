"use server"

import { getAuthenticatedUser, getOctokit } from "@/lib/octokit"

export async function getStats() {
  const octokit = await getOctokit()

  const user = await getAuthenticatedUser()

  const thisYear = new Date().getFullYear()

  // total connected repos
  const totalConnectedRepos = 10

  // total commits
  const totalCommits = await octokit.rest.search
    .commits({
      q: `author:${user.login} committer-date:${thisYear}-01-01..${thisYear}-12-31`,
      per_page: 1,
    })
    .then((res) => res.data.total_count)

  // total pull requests
  const totalPullRequests = await octokit.rest.search
    .issuesAndPullRequests({
      q: `author:${user.login} type:pr created:${thisYear}-01-01..${thisYear}-12-31`,
      per_page: 1,
    })
    .then((res) => res.data.total_count)

  // total reviews
  const totalReviews = 20

  return {
    totalConnectedRepos: totalConnectedRepos,
    totalCommits: totalCommits,
    totalPullRequests: totalPullRequests,
    totalReviews: totalReviews,
  }
}
