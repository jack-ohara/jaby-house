import { redirectToLoginPage } from "$lib/util/redirectToLoginPage"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ parent }) => {
  const { session } = await parent()
  if (!session?.user) {
    redirectToLoginPage()
  }
  return {}
}