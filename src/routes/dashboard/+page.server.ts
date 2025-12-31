import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
    const session = cookies.get('AppwriteSession');

    if (!session) {
        throw redirect(302, '/login');
    }

    return {
        isAuthenticated: true
    };
};
