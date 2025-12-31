import { json } from '@sveltejs/kit';
import * as sdk from 'node-appwrite';
import { serverAccount } from '$lib/server/appwrite';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
    const { email, password, type } = await request.json();

    if (!serverAccount) {
        return json({ success: false, message: 'Authentication service not configured.' }, { status: 503 });
    }

    try {
        let user;
        if (type === 'signup') {
            user = await serverAccount.create(sdk.ID.unique(), email, password);
            await serverAccount.createEmailPasswordSession(email, password);
        } else {
            await serverAccount.createEmailPasswordSession(email, password);
            user = await serverAccount.get();
        }

        const session = await serverAccount.getSession('current');

        cookies.set('AppwriteSession', session.secret, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 30,
        });

        return json({ success: true, user: { email: user.email, name: user.name } });

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
        if (error.code === 401 || error.status === 401) {
             return json({ success: false, message: 'Invalid email or password.' }, { status: 401 });
        }
        if (error.code === 400) {
            return json({ success: false, message: error.message }, { status: 400 });
        }
        console.error('Server auth error:', error);
        return json({ success: false, message: `Server error: ${error.message || 'Unknown error'}` }, { status: 500 });
    }
}
