import { redirect } from '@sveltejs/kit';
import { serverAccount } from '$lib/server/appwrite';

export async function GET({ url, cookies }) {
    const userId = url.searchParams.get('userId');
    const secret = url.searchParams.get('secret');

    if (!userId || !secret || !serverAccount) {
        throw redirect(302, '/login?error=invalid_link');
    }

    try {
        const session = await serverAccount.createSession(userId, secret);

        cookies.set('AppwriteSession', session.secret, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 30,
        });

        throw redirect(302, '/dashboard');
    } catch (error: any) {
        console.error('Magic link validation error:', error);
        throw redirect(302, `/login?error=${error.message || 'invalid_link'}`);
    }
}
