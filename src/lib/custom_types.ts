/**
 * A more complex type to manage prisma queries which include related data from other tables
 */
export type TConnection = ({
    followedBy?: {
        timezone: string | null;
    };
} & {
    following?: {
        timezone: string | null;
    };
} & {
    followedByEmail: string;
    followingEmail: string;
    followedById: string;
    followingId: string;
    followedByUName: string;
    followingUName: string;
});