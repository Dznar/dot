import { Client, Account } from 'node-appwrite';
import { APPWRITE_API_KEY } from '$env/static/private';
import { PUBLIC_APPWRITE_PROJECT_ID, PUBLIC_APPWRITE_API_ENDPOINT } from '$env/static/public';

let serverAccount: Account | null = null;

if (PUBLIC_APPWRITE_API_ENDPOINT && PUBLIC_APPWRITE_PROJECT_ID && APPWRITE_API_KEY &&
    PUBLIC_APPWRITE_API_ENDPOINT !== 'YOUR_APPWRITE_ENDPOINT' &&
    PUBLIC_APPWRITE_PROJECT_ID !== 'YOUR_APPWRITE_PROJECT_ID' &&
    APPWRITE_API_KEY !== 'YOUR_APPWRITE_API_KEY') {
    const client = new Client();

    client
        .setEndpoint(PUBLIC_APPWRITE_API_ENDPOINT)
        .setProject(PUBLIC_APPWRITE_PROJECT_ID)
        .setKey(APPWRITE_API_KEY);

    serverAccount = new Account(client);
}

export { serverAccount };
