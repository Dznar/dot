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

        if (type === 'signup') {
            const userId = sdk.ID.unique();
            await serverAccount.create(userId, email, 'placeholder-password', undefined, phone);

            await serverAccount.createEmailToken(userId, email, false, magicLinkUrl);
        } else {
            await serverAccount.createMagicURLToken(email, magicLinkUrl, false);
        }

        return json({ success: true, message: 'Magic link sent to your email.' });

    } catch (error: any) {
        console.error('Auth error details:', {
            code: error.code,
            status: error.status,
            message: error.message,
            type: error.type,
            fullError: error
        });

        if (error.code === 409) {
            return json({ success: false, message: 'A user with this email already exists.' }, { status: 409 });
        }
        if (error.code === 404 && type === 'login') {
            return json({ success: false, message: 'No account found with this email.' }, { status: 404 });
        }
        if (error.message?.includes('already exists')) {
            return json({ success: false, message: 'A user with this email already exists.' }, { status: 409 });
        }
        if (error.message?.includes('not found')) {
            return json({ success: false, message: 'User not found.' }, { status: 404 });
        }
        console.error('Server auth error:', error);
        return json({ success: false, message: `Server error: ${error.message || 'Unknown error'}` }, { status: 500 });
    }
}
