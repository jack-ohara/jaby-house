import { error } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";

export async function POST({ locals, fetch, request }: RequestEvent): Promise<Response> {
    const session = await locals.getSession()

    if (!session) {
        throw error(401, 'You must be logged in to use this endpoint')
    }

    if (!('idToken' in session)) {
        throw error(500, 'Could not find valid access token in session')
    }

    return fetch('https://jg0e9kasq9.execute-api.eu-west-1.amazonaws.com/prod/push-manager-subscription', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session.idToken}`
        },
        body: await request.text()
    })
}