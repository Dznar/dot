import { serverAccount } from '$lib/server/appwrite';
import type { LayoutServerLoad } from './$types';
import type { Models } from 'appwrite';

export const load: LayoutServerLoad = async ({ cookies }) => {
    const sessionId = cookies.get('AppwriteSession');

    if (!sessionId) {
        return { user: null };
    }

    try {
        // Set the session for the server-side Appwrite client
        serverAccount.client.setSession(sessionId);
        const user: Models.User<Models.Preferences> = await serverAccount.get();

        return {
            user: {
                $id: user.$id,
                email: user.email,
                name: user.name,
                status: user.status
            }
        };
    } catch (error) {
        // If the session is invalid, clear the cookie and return null
        cookies.delete('AppwriteSession', { path: '/' });
        return {
            user: null
        };
    }
};

