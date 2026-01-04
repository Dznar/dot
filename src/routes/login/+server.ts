import { json } from '@sveltejs/kit';
import * as sdk from 'node-appwrite';
import { serverAccount } from '$lib/server/appwrite';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, url }) {
    const { email, phone, type } = await request.json();

    if (!serverAccount) {
        return json({ success: false, message: 'Authentication service not configured.' }, { status: 503 });
    }

    try {
        const origin = url.origin;
        const magicLinkUrl = `${origin}/auth/magic-callback`;

        await serverAccount.createMagicURLToken(email, magicLinkUrl, false);

        return json({ success: true, message: 'Magic link sent to your email.' });

    } catch (error: any) {
        console.error('Magic link error:', error);
        return json({ success: false, message: 'Failed to send magic link. Please try again.' }, { status: 500 });
    }
}
