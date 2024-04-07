import { z } from "zod";

/**
 * Currently relying on different regex combinations to block malicious characters used in many attacks
 * as per sting usage i.e. timezone needs `( ) + -`, where user id only needs standard + `_`
 */
const stringSanitzationRegex = new RegExp(`(^[a-zA-Z 0-9\.\,\+\?\'\#\(\)\-]*$)`);
const userIdSanitzationRegex = new RegExp(`(^[a-zA-Z 0-9\_]*$)`);
const bioSanitzationRegex = new RegExp(`(^[a-zA-Z 0-9\.\,\+\:\?\#\'\!\-]*$)`);
const timezoneSanitzationRegex = new RegExp(`(^[a-zA-Z 0-9\+\:\(\)\,\-]*$)`);

export const StringSchema = z.string().min(1).max(1000).regex(stringSanitzationRegex, { message: "Security sanitation failed. Reduced special characters allowed" });
export const UserIdSchema = z.string().min(5).max(500).regex(userIdSanitzationRegex, { message: "Security sanitation failed. User id only '_' and standard chars" });
const TimezoneSchema = z.string().min(1).max(200).regex(timezoneSanitzationRegex, { message: "Z - Security sanitation failed. Reduced special characters allowed (timezone)" });
const BioSchema = z.string().min(1).max(1000).regex(bioSanitzationRegex, { message: "Z - Security sanitation failed. Reduced special characters allowed (bio)" });
const EmailSchema = z.string().min(1).max(200).email();
export const NumberSchema = z.number();

export const UserSchema = z.object({
    id: UserIdSchema,
    email: EmailSchema.nullable(),
    userName: StringSchema.nullable(),
    bio: BioSchema.nullable(),
    timezone: TimezoneSchema.nullable(),
});

export const SearchStateSchema = z.object({
    genre: StringSchema.nullable(),
    platform: StringSchema.nullable(),
    mode: StringSchema.nullable(),
    search: StringSchema.nullable(),
    currentSelected: StringSchema.nullable(),
});

export const SearchableGameSchema = z.object({
    value: StringSchema,
    label: StringSchema
});

export const GameSchema = z.object({
    id: NumberSchema,
    name: StringSchema,
    summary: StringSchema.nullable(),
    url: StringSchema.nullable(),
    firstReleaseDate: NumberSchema.nullable(),
    genres: z.array(z.string().regex(stringSanitzationRegex, { message: "Security sanitation failed. Reduced special characters allowed" })),
    platforms: z.array(z.string().regex(stringSanitzationRegex, { message: "Security sanitation failed. Reduced special characters allowed" })),
    modes: z.array(z.string().regex(stringSanitzationRegex, { message: "Security sanitation failed. Reduced special characters allowed" })),
    _count: z.object({
        users: NumberSchema,
    }).optional(),
});

export const MessageSchema = z.object({
    createdAt: z.date(),
    message: StringSchema,
    id: StringSchema,
    chatPrivateRoomId: StringSchema,
    senderId: UserIdSchema,
    receiverId: UserIdSchema,
    seen: z.boolean(),
});

export const UnsafeMetadataSchema = z.object({
    bio: BioSchema,
    timezone: TimezoneSchema,
});

export const ConnectionWithTimezone = z.object({
    followedByEmail: EmailSchema,
    followingEmail: EmailSchema,
    followedById: UserIdSchema,
    followingId: UserIdSchema,
    followedByUName: StringSchema,
    followingUName: StringSchema,
    followedBy: z.object({
        timezone: TimezoneSchema.nullable(),
    }).optional(),
    following: z.object({
        timezone: TimezoneSchema.nullable(),
    }).optional(),
});

export default z;