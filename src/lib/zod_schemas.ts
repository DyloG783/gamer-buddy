import { z } from "zod";

// this blocks characters used in scripts, urls, etc and provides good validation against malicious input
const inputSanitzationRegex = new RegExp(`(^[a-zA-Z 0-9\.\,\+\-]*$)`);

export const UserSchema = z.object({
    id: z.string().min(5).max(200).regex(inputSanitzationRegex, { message: "Security sanitation failed. No special characters except ',.+-'" }),
    email: z.string().email().nullable(),
    userName: z.string().min(5).max(200).regex(inputSanitzationRegex, { message: "Security sanitation failed. No special characters except ',.+-'" }).nullable(),
    bio: z.string().min(5).max(1000).regex(inputSanitzationRegex, { message: "Security sanitation failed. No special characters except ',.+-'" }).nullable(),
    timezone: z.string().min(5).max(1000).regex(inputSanitzationRegex, { message: "Security sanitation failed. No special characters except ',.+-'" }).nullable(),
});

export const SearchStateSchema = z.object({
    genre: z.string().min(2).max(50).regex(inputSanitzationRegex, { message: "Security sanitation failed. No special characters except ',.+-'" }).nullable(),
    platform: z.string().min(2).max(50).regex(inputSanitzationRegex, { message: "Security sanitation failed. No special characters except ',.+-'" }).nullable(),
    mode: z.string().min(2).max(50).regex(inputSanitzationRegex, { message: "Security sanitation failed. No special characters except ',.+-'" }).nullable(),
    search: z.string().min(1).max(50).regex(inputSanitzationRegex, { message: "Security sanitation failed. No special characters except ',.+-'" }).nullable(),
    currentSelected: z.string().min(2).max(50).regex(inputSanitzationRegex, { message: "Security sanitation failed. No special characters except ',.+-'" }).nullable(),
});

export const SearchableGameSchema = z.object({
    value: z.string().min(2).max(50).regex(inputSanitzationRegex, { message: "Security sanitation failed. No special characters except ',.+-'" }),
    label: z.string().min(2).max(50).regex(inputSanitzationRegex, { message: "Security sanitation failed. No special characters except ',.+-'" })
});

export const GameSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(1).max(200).regex(inputSanitzationRegex, { message: "Security sanitation failed. No special characters except ',.+-'" }),
    summary: z.string().min(5).max(1000).regex(inputSanitzationRegex, { message: "Security sanitation failed. No special characters except ',.+-'" }).nullable(),
    url: z.string().min(5).max(500).nullable(),
    firstReleaseDate: z.number().positive().nullable(),
    genres: z.array(z.string().regex(inputSanitzationRegex, { message: "Security sanitation failed. No special characters except ',.+-'" })),
    platforms: z.array(z.string().regex(inputSanitzationRegex, { message: "Security sanitation failed. No special characters except ',.+-'" })),
    modes: z.array(z.string().regex(inputSanitzationRegex, { message: "Security sanitation failed. No special characters except ',.+-'" })),
    _count: z.object({
        users: z.number(),
    }).optional(),
});

export const MessageSchema = z.object({
    createdAt: z.date(),
    message: z.string().min(1).max(1000).regex(inputSanitzationRegex, { message: "Security sanitation failed. No special characters except ',.+-'" }),
    id: z.string().min(5).max(1000).regex(inputSanitzationRegex, { message: "Security sanitation failed. No special characters except ',.+-'" }),
    chatPrivateRoomId: z.string().min(5).max(1000).regex(inputSanitzationRegex, { message: "Security sanitation failed. No special characters except ',.+-'" }),
    senderId: z.string().min(5).max(1000).regex(inputSanitzationRegex, { message: "Security sanitation failed. No special characters except ',.+-'" }),
    receiverId: z.string().min(5).max(1000).regex(inputSanitzationRegex, { message: "Security sanitation failed. No special characters except ',.+-'" }),
    seen: z.boolean(),
});

export const StringSchema = z.string().min(1).max(1000).regex(inputSanitzationRegex, { message: "Security sanitation failed. No special characters except ',.+-'" });
export const NumberSchema = z.number();

export const UnsafeMetadataSchema = z.object({
    bio: z.string().min(5).max(1000).regex(inputSanitzationRegex, { message: "Security sanitation failed. No special characters except ',.+-'" }),
    timezone: z.string().min(5).max(1000).regex(inputSanitzationRegex, { message: "Security sanitation failed. No special characters except ',.+-'" }),
});