import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import prisma from '@/lib/db'
import { UnsafeMetadataSchema } from '@/lib/zod_schemas';
import z from 'zod';

export async function POST(req: Request) {

    // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400
        })
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400
        })
    }


    if (evt.type === 'user.created') {
        const userName = evt.data.username;
        const email = evt.data.email_addresses[0];
        const userId = evt.data.id;
        const bio: z.infer<typeof UnsafeMetadataSchema>["bio"] = evt.data.unsafe_metadata.bio as string;
        const timezone: z.infer<typeof UnsafeMetadataSchema>["timezone"] = evt.data.unsafe_metadata.timezone as string;

        try {
            await prisma.user.upsert({
                where: {
                    id: userId,
                },
                update: {},
                create: {
                    id: userId,
                    email: email.email_address,
                    userName: userName,
                    bio: bio,
                    timezone: timezone
                }
            })
            console.log("Webhook, Create user, Prisma; Success!");
        } catch (error) {
            console.log("Webhook, Create user, Prisma; ", error);
        }
    }

    if (evt.type === 'user.updated') {
        const userName = evt.data.username;
        const email = evt.data.email_addresses[0];
        const userId = evt.data.id;
        const bio: z.infer<typeof UnsafeMetadataSchema>["bio"] = evt.data.unsafe_metadata.bio as string;
        const timezone: z.infer<typeof UnsafeMetadataSchema>["timezone"] = evt.data.unsafe_metadata.timezone as string;

        try {
            await prisma.user.upsert({
                where: {
                    id: userId,
                },
                update: {
                    // id: userId,
                    userName: userName,
                    email: email.email_address,
                    bio: bio,
                    timezone: timezone
                },
                create: {
                    id: userId,
                    userName: userName,
                    email: email.email_address,
                    bio: bio,
                    timezone: timezone
                }
            })
            console.log("Webhook, Update user, Prisma; Success!");
        } catch (error) {
            console.log("Webhook, Update user, Prisma; ", error);
        }
    }

    if (evt.type === 'user.deleted') {
        const userId = evt.data.id;
        try {
            await prisma.user.delete({
                where: {
                    id: userId,
                },
            })

            console.log("Webhook, Delete user, Prisma; Success!");
        } catch (error) {
            console.log("Webhook, Delete user, Prisma; ", error);
        }
    }

    return new Response('', { status: 200 })
}
