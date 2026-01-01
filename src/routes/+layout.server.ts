import { serverAccount } from '$lib/server/appwrite';
import type { LayoutServerLoad } from './$types';
import type { Models } from 'appwrite';
import { Client, Account } from 'node-appwrite';
import { APPWRITE_API_KEY } from '$env/static/private';
import { PUBLIC_APPWRITE_PROJECT_ID, PUBLIC_APPWRITE_API_ENDPOINT } from '$env/static/public';

export const load: LayoutServerLoad = async ({ cookies }) => {
    const sessionSecret = cookies.get('AppwriteSession');

    if (!sessionSecret || !serverAccount) {
        return { user: null };
    }

    try {
        const client = new Client();
        client
            .setEndpoint(PUBLIC_APPWRITE_API_ENDPOINT)
            .setProject(PUBLIC_APPWRITE_PROJECT_ID)
            .setKey(APPWRITE_API_KEY);

        const account = new Account(client);
        account.client.setSession(sessionSecret);
        const user: Models.User<Models.Preferences> = await account.get();

        return {
            user: {
                $id: user.$id,
                email: user.email,
                name: user.name,
                status: user.status
            }
        };
    } catch (error) {
        console.error('Session validation error:', error);
        cookies.delete('AppwriteSession', { path: '/' });
        return {
            user: null
        };
    }
};

