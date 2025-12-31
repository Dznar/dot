import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

interface ContactPayload {
    email: string;
    subject: string;
    message: string;
    imageUrl?: string;
}

export const POST: RequestHandler = async ({ request }) => {
    try {
        const payload: ContactPayload = await request.json();
        const { email, subject, message, imageUrl } = payload;

        if (!email || !subject || !message) {
            return json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // TODO: Configure these environment variables with your EmailJS credentials
        // PUBLIC_EMAILJS_SERVICE_ID, PUBLIC_EMAILJS_TEMPLATE_ID, PUBLIC_EMAILJS_PUBLIC_KEY
        const serviceId = process.env.PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.PUBLIC_EMAILJS_PUBLIC_KEY;
        const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL;

        if (!serviceId || !templateId || !publicKey || !recipientEmail) {
            return json(
                { error: 'Email service is not configured. Please add EmailJS credentials and CONTACT_RECIPIENT_EMAIL to your .env file' },
                { status: 500 }
            );
        }

        const emailPayload = {
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
                from_email: email,
                subject: subject,
                message: message,
                image_url: imageUrl || 'No image attached',
                to_email: recipientEmail
            }
        };

        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailPayload)
        });

        if (!response.ok) {
            throw new Error('EmailJS request failed');
        }

        return json({
            success: true,
            message: 'Email sent successfully'
        });
    } catch (error) {
        console.error('Send email error:', error);
        return json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
};
