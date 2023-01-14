import { HouseholdClient } from "$lib/householdClient"
import { redirectToLoginPage } from "$lib/util/redirectToLoginPage"
import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.getSession()
  if (!session?.user) {
    redirectToLoginPage()

    // Return isn't necessary as the above will throw an error
    // but typescript doesn't seem to know that
    return
  }

  try {
    const client = new HouseholdClient(session)
    const household = await client.getHousehold()

    if (!household) {
      throw redirect(301, '/household')
    }

    return {
      household,
      title: 'Schedule'
    }
  } catch (e) {
    console.log('error retrieving household:', e)
    return {
      title: 'Schedule'
    }
  }
}
