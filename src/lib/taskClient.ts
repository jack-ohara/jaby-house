import { API_BASE_URL } from "$env/static/private";
import type { Session } from "@auth/core/types";
import { Client } from "./client";

export class TaskClient extends Client {
    private base_url: string;

    constructor(session: Session) {
        super(session)

        this.base_url = `${API_BASE_URL}/schedule/task`
    }

    async createTask(payload: Record<string, string | number | undefined>) {
        try {
            const response = await fetch(this.base_url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${this.auth_token}`
                },
                body: JSON.stringify(payload)
            })

            if (response.ok) {
                return
            }

            throw new Error(`Error creating a new task: ${response}`)
        } catch (e) {
            console.log('error creating task:', e)
            throw e
        }
    }
}