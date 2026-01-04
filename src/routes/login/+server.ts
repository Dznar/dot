import { json } from '@sveltejs/kit';
import { serverAccount } from '$lib/server/appwrite';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const { email, code } = await request.json();

    if (!serverAccount) {
        return json({ success: false, message: 'Authentication service not configured.' }, { status: 503 });
    }

    try {
        if (code) {
            // Verify code and create session
            const session = await serverAccount.createSession(email, code);
            return json({ success: true, message: 'Login successful', sessionSecret: session.secret });
        } else {
            // Send OTP code to email
            await serverAccount.createEmailToken(email, false);
            return json({ success: true, message: 'Code sent to your email. Check your inbox.' });
        }
    } catch (error: any) {
        console.error('Auth error:', error);
        return json({ success: false, message: error.message || 'Authentication failed. Please try again.' }, { status: 500 });
    }
}
