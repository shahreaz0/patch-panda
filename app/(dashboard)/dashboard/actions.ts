"use server"

export async function getStats() {
  await Bun.sleep(1000)

  return {
    connectedRepos: 12,
    totalCommits: 25,
    totalPullRequests: 12,
    totalReviews: 12,
  }
}
