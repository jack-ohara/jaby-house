import { redirect } from "@sveltejs/kit"

export const redirectToLoginPage = () => {
    throw redirect(302, '/login')
}