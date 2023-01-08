import { redirect } from "@sveltejs/kit"

export const redirectToLoginPage = () => {
    throw redirect(301, '/login')
}