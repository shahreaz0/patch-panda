"use server"

import { headers } from "next/headers"
import { Octokit } from "octokit"
import { auth } from "@/lib/auth"

export async function getOctokit() {
  const token = await auth.api.getAccessToken({
    body: { providerId: "github" },
    headers: await headers(),
  })

  if (!token) {
    throw new Error("Failed to get access token")
  }

  return new Octokit({
    auth: token.accessToken,
  })
}

export async function getAuthenticatedUser() {
  const octokit = await getOctokit()
  const { data } = await octokit.rest.users.getAuthenticated()
  return data
}

export async function getRepositories() {
  const octokit = await getOctokit()

  const repositories = await octokit.paginate(
    octokit.rest.repos.listForAuthenticatedUser,
    {
      type: "all",
      sort: "updated",
    },
  )

  return repositories
}
