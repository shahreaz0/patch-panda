import { headers } from "next/headers"
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
