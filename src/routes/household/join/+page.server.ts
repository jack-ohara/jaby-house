import { HouseholdClient } from "$lib/householdClient"
import { redirectToLoginPage } from "$lib/util/redirectToLoginPage"
import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals, url }) => {
    const session = await locals.getSession()
    if (!session?.user) {
        redirectToLoginPage()

        // Return isn't necessary as the above will throw an error
        // but typescript doesn't seem to know that
        return
    }

    const joinCode = url.searchParams.get('code')

    if (!joinCode) {
        return {
            error: 'No join code found in URL'
        }
    }

    try {
        const client = new HouseholdClient(session)
        await client.joinHousehold(joinCode)

        console.log('joined household, redirecting to home page')
    } catch (e) {
        console.log('error retrieving household:', e)
        return {
            error: 'Invalid join code'
        }
    }

    throw redirect(301, '/')
}