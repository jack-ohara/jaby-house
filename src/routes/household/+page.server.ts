import { HouseholdClient } from '$lib/householdClient';
import { redirectToLoginPage } from '$lib/util/redirectToLoginPage';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

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

export const actions: Actions = {
  createHousehold: async ({ locals, request }) => {
    const session = await locals.getSession()
    if (!session?.user) {
      redirectToLoginPage()

      // Return isn't necessary as the above will throw an error
      // but typescript doesn't seem to know that
      return
    }

    const data = await request.formData()
    const housholdName = await data.get('new-houshold-name')

    if (!housholdName) {
      return error(400, 'New household name must be provided')
    }

    console.log('creating household...')
    const client = new HouseholdClient(session)
    const result = await client.createHousehold(housholdName.toString())

    console.log('new household created:', result)
  },

  leaveHousehold: async({ locals }) => {
    const session = await locals.getSession()
    if (!session?.user) {
      redirectToLoginPage()

      // Return isn't necessary as the above will throw an error
      // but typescript doesn't seem to know that
      return
    }

    const client = new HouseholdClient(session)
    await client.leaveHousehold()
  }
}