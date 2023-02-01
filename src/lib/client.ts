import type { Session } from "@auth/core/types";

export class Client {
    protected auth_token: string;

    constructor(session: Session) {
        if (!('id_token' in session)) {
            throw Error('Could not find valid access token in session')
        }

        this.auth_token = session.id_token as string
    }
}