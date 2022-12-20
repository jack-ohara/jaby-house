import SvelteKitAuth from "@auth/sveltekit";
import Cognito from '@auth/core/providers/cognito'
import { COGNITO_CLIENT_ID, COGNITO_CLIENT_SECRET, COGNITO_ISSUER } from '$env/static/private'

export const handle = SvelteKitAuth({
    providers: [
        Cognito({
            clientId: COGNITO_CLIENT_ID,
            clientSecret: COGNITO_CLIENT_SECRET,
            issuer: COGNITO_ISSUER,
        })
    ],
})