import { API_BASE_URL } from "$env/static/private";
import type { Session } from "@auth/core/types";
import { Client } from "./client";

export class HouseholdClient extends Client {
    private base_url: string;

    constructor(session: Session) {
        super(session)

        this.base_url = `${API_BASE_URL}/household`
    }

    async getHousehold() {
        try {
            const response = await fetch(this.base_url, {
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
            const response = await fetch(this.base_url, {
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
            const response = await fetch(`${this.auth_token}/join`, {
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
            const response = await fetch(`${this.auth_token}/leave`, {
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