"use server"

import { getOctokit } from "@/lib/octokit"

export async function getRepositories({
  page = 1,
  perPage = 10,
  q = "",
  visibility = "all",
}: {
  page?: number
  perPage?: number
  q?: string
  visibility?: string
} = {}) {
  const octokit = await getOctokit()

  const username = await octokit.rest.users
    .getAuthenticated()
    .then((res) => res.data.login)

  const { data } = await octokit.rest.search.repos({
    q: `user:${username} ${q} is:${visibility}`,
    order: "desc",
    page,
    per_page: perPage,
    sort: "updated",
  })

  return data.items
}
