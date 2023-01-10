import { redirectToLoginPage } from '$lib/util/redirectToLoginPage';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
    const { session } = await parent()
    if (!session?.user) {
        redirectToLoginPage()

        // Return isn't necessary as the above will throw an error
        // but typescript doesn't seem to know that
        return
    }

    return {
        title: 'Settings'
    };
}