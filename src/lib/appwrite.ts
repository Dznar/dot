import { Client, Account } from 'appwrite';
import { PUBLIC_APPWRITE_PROJECT_ID, PUBLIC_APPWRITE_API_ENDPOINT } from '$env/static/public';

const client = new Client();

client
    .setEndpoint(PUBLIC_APPWRITE_API_ENDPOINT)
    .setProject(PUBLIC_APPWRITE_PROJECT_ID);

export const account = new Account(client);
