import { API_BASE_URL } from "$env/static/private";
import { error } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";

export async function POST({ locals, fetch, request }: RequestEvent): Promise<Response> {
    const session = await locals.getSession()

    if (!session) {
        throw error(401, 'You must be logged in to use this endpoint')
    }

    if (!('id_token' in session)) {
        throw error(500, 'Could not find valid access token in session')
    }

    try {
        const response = await fetch(`${API_BASE_URL}/push-manager-subscription`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session.id_token}`
            },
            body: await request.text()
        })

        return response
    } catch (e) {
        console.log('error posting push manager subscription:', e)
        throw e
    }
}