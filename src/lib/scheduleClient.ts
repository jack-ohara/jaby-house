import { API_BASE_URL } from "$env/static/private";
import type { Session } from "@auth/core/types";
import { Client } from "./client";

export class ScheduleClient extends Client {
    private base_url: string;

    constructor(session: Session) {
        super(session)
        
        this.base_url = `${API_BASE_URL}/schedule`
    }

    async getSchedule() {
        try {
            const response = await fetch(this.base_url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${this.auth_token}`
                },
            })

            if (response.ok) {
                return response.json()
            }

            return
        } catch (e) {
            console.log('error retrieving schedule', JSON.stringify(e))
            throw e
        }
    }
}