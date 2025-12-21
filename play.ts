import { headers } from "next/headers"
import { Octokit } from "octokit"
import { auth } from "@/lib/auth"

export async function getOctokit() {
  try {
    const token = await auth.api.getSession({ headers: await headers() })

    console.log(token)

    // const octokit = new Octokit({
    //   auth: token.accessToken,
    // })

    // return octokit
  } catch (error) {
    console.log(error)
  }
}

const octokit = await getOctokit()

// const res = octokit?.rest.users.getAuthenticated()

// console.log(res)
