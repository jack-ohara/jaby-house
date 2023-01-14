import type { Session } from "@auth/core/types";

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

            // We can get a 204 if the user isn't yet in a household
            if (response.ok && response.status === 200) {
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

            if (response.ok) {
                return await response.json()
            }

            return undefined
        } catch (e) {
            console.log('error creating household:', e)
            throw e
        }
    }

    async joinHousehold(joinCode: string) {
        try {
            const response = await fetch('https://ocsrml2vvb.execute-api.eu-west-1.amazonaws.com/prod/household/join', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${this.auth_token}`
                },
                body: JSON.stringify({ joinCode })
            })

            if (response.ok) {
                return await response.json()
            }

            throw new Error('Something went wrong')
        } catch (e) {
            console.log('error joining household:', e)
            throw e
        }
    }

    async leaveHousehold() {
        try {
            const response = await fetch('https://ocsrml2vvb.execute-api.eu-west-1.amazonaws.com/prod/household/leave', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${this.auth_token}`
                },
            })

            if (response.ok) {
                return
            }

            console.log('status code from leave household call not 200:', response)
        } catch (e) {
            console.log('error leaving household:', e)
            throw e
        }
    }
}