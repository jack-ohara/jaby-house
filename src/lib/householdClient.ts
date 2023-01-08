import type { Session } from "@auth/core";

export class HouseholdClient {
    private auth_token: string;

    constructor(session: Session) {
        if (!('id_token' in session)) {
            throw Error('Could not find valid access token in session')
        }

        this.auth_token = session.id_token as string
    }

    async getHousehold() {
        try {
            const response = await fetch('https://ocsrml2vvb.execute-api.eu-west-1.amazonaws.com/prod/household', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${this.auth_token}`
                }
            })

            if (response.ok) {
                return response.json()
            }

            return undefined
        } catch (e) {
            console.log('error retrieving household:', e)
            throw e
        }
    }

    async createHousehold(householdName: string) {
        try {
            const response = await fetch('https://ocsrml2vvb.execute-api.eu-west-1.amazonaws.com/prod/household', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${this.auth_token}`
                },
                body: JSON.stringify({ name: householdName })
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