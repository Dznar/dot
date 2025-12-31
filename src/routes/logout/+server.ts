import { json } from '@sveltejs/kit';
import { serverAccount } from '$lib/server/appwrite';

/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies }) {
    try {
        await serverAccount.deleteSession('current'); // Delete current session in Appwrite
        cookies.delete('AppwriteSession', { path: '/' }); // Clear the cookie

        return json({ success: true, message: 'Logged out successfully.' });
    } catch (error: any) {
        console.error('Server logout error:', error);
        return json({ success: false, message: 'An unexpected error occurred during logout.' }, { status: 500 });
    }
}
