import { Client, Account } from 'node-appwrite';
import { APPWRITE_API_KEY } from '$env/static/private';
import { PUBLIC_APPWRITE_PROJECT_ID, PUBLIC_APPWRITE_API_ENDPOINT } from '$env/static/public';

const client = new Client();

client
    .setEndpoint(PUBLIC_APPWRITE_API_ENDPOINT)
    .setProject(PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(APPWRITE_API_KEY);

export const serverAccount = new Account(client);
