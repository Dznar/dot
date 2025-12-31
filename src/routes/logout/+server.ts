import { json } from '@sveltejs/kit';
import { serverAccount } from '$lib/server/appwrite';

/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies }) {
    if (!serverAccount) {
        cookies.delete('AppwriteSession', { path: '/' });
        return json({ success: true, message: 'Logged out successfully.' });
    }

    try {
        await serverAccount.deleteSession('current');
        cookies.delete('AppwriteSession', { path: '/' });

        return json({ success: true, message: 'Logged out successfully.' });
    } catch (error: any) {
        console.error('Server logout error:', error);
        return json({ success: false, message: 'An unexpected error occurred during logout.' }, { status: 500 });
    }
}
