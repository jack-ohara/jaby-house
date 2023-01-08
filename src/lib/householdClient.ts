import type { Session } from "@auth/core";
import { error } from "@sveltejs/kit";

export class HouseholdClient {
    private auth_token: string;

    constructor(session: Session) {
        if (!('id_token' in session)) {
            throw error(500, 'Could not find valid access token in session')
        }
        
        this.auth_token = session.id_token as string
    }

    async getHousehold() {
        console.log('auth_toke:', this.auth_token)
        try {
            const response = await fetch('https://ocsrml2vvb.execute-api.eu-west-1.amazonaws.com/prod/household', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${this.auth_token}`
                }
            })
    
            if (response.bodyUsed) {
                return await response.json()
            }

            return undefined
        } catch (e) {
            console.log('error posting push manager subscription:', e)
            throw e
        }
    }
}