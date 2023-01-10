import { HouseholdClient } from '$lib/householdClient';
import { redirectToLoginPage } from '$lib/util/redirectToLoginPage';
import type { PageServerLoad } from './$types';

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

        return {
            household,
            title: 'Household'
        }
    } catch (e) {
        console.log('error retrieving household:', e)
        return {
            title: 'Household'
        }
    }
}