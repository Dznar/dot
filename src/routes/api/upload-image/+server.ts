import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return json({ error: 'No file provided' }, { status: 400 });
        }

        // TODO: Configure these environment variables with your Cloudinary credentials
        // VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET
        const cloudinaryCloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME;
        const cloudinaryPreset = process.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        if (!cloudinaryCloudName || !cloudinaryPreset) {
            return json(
                { error: 'Cloudinary is not configured. Please add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to your .env file' },
                { status: 500 }
            );
        }

        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        uploadFormData.append('upload_preset', cloudinaryPreset);

        const uploadResponse = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
            {
                method: 'POST',
                body: uploadFormData
            }
        );

        if (!uploadResponse.ok) {
            throw new Error('Cloudinary upload failed');
        }

        const uploadData = await uploadResponse.json();

        return json({
            url: uploadData.secure_url
        });
    } catch (error) {
        console.error('Image upload error:', error);
        return json(
            { error: 'Failed to upload image' },
            { status: 500 }
        );
    }
};
