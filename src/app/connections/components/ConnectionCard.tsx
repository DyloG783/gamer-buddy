import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@nextui-org/react";
import z, { MessageSchema, ConnectionWithTimezone } from '@/lib/zod_schemas';

export default function ConnectionCard({ connection, typeFlag, unseenMessages }: { connection: z.infer<typeof ConnectionWithTimezone>, typeFlag: string, unseenMessages?: z.infer<typeof MessageSchema>[] | null }) {

    let unseen = false;

    // sets the above flag if this connected user has any unread messages for the user
    if (unseenMessages) {
        unseenMessages?.map(((m) => {
            if (m.senderId === connection.followedById) {
                unseen = true;
            }
        }));
    }

    let testId: string = 'DEFAULT';
    if (typeFlag === 'following') testId = 'following_card';
    if (typeFlag === 'requested') testId = 'requested_card';
    if (typeFlag === 'connected') testId = 'connected_card';


    return (
        <Card className="w-[250px] md:w-[300px]" data-testid={testId}>
            <CardHeader className="flex gap-3">
                {typeFlag === 'following' &&

                    <Link className="flex" href={`/connections/view-player/${connection.followingId}`}>
                        <p className="text-md primary-color-font font-semibold">{connection.followingUName}</p>
                    </Link>
                }
                {typeFlag === 'requested' &&

                    <Link className="flex" href={`/connections/view-player/${connection.followedById}`}>
                        <p className="text-md primary-color-font font-semibold">{connection.followedByUName}</p>
                    </Link>
                }
                {typeFlag === 'connected' &&
                    <>
                        <Link className="flex" href={`/connections/view-player/${connection.followedById}`}>
                            <p className="text-md primary-color-font font-semibold">{connection.followedByUName}</p>
                        </Link>
                        {unseen &&
                            <span className="absolute h-3 w-3 rounded-full bg-red-500 border-2 border-gray-500 top-2 right-2" />
                        }
                    </>
                }

            </CardHeader>
            <Divider />
            <CardBody>
                {typeFlag === 'following' && connection.following!.timezone != null &&
                    <p className="text-sm italic text-nowrap">{connection.following!.timezone}</p>
                }
                {typeFlag === 'requested' && connection.followedBy!.timezone != null &&
                    <p className="text-sm italic text-nowrap">{connection.followedBy!.timezone}</p>
                }
                {typeFlag === 'connected' && connection.followedBy!.timezone != null &&
                    <p className="text-sm italic text-nowrap">{connection.followedBy!.timezone}</p>
                }
            </CardBody>
            <Divider />
            <CardFooter>
                {typeFlag === 'following' &&
                    <Link
                        showAnchorIcon
                        href={`/connections/view-player/${connection.followingId}`}
                        className="text-sm"
                    >
                        Connect with player
                    </Link>
                }
                {typeFlag === 'requested' &&
                    <Link
                        showAnchorIcon
                        href={`/connections/view-player/${connection.followedById}`}
                        className="text-sm"
                    >
                        Connect with player
                    </Link>
                }
                {typeFlag === 'connected' &&
                    <Link
                        showAnchorIcon
                        href={unseen ? `/connections/${connection.followingId}/${connection.followedById}` : `/connections/view-player/${connection.followedById}`}
                        className="text-sm"

                    >
                        {`Chat with ${connection.followedByUName}`}
                    </Link>
                }
            </CardFooter>
        </Card>
    );
}
