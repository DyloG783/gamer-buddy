import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@nextui-org/react";
import { IConnection, TMessage } from "@/lib/custom_types";

export default async function ConnectedCard({ connection, unseenMessages }:
    { connection: IConnection, unseenMessages?: TMessage[] | null }) {

    let unseen = false;

    // sets the above flag if this connected user has any unread messages for the user
    if (unseenMessages) {
        unseenMessages?.map(((m) => {
            if (m.senderId === connection.followedById) {
                unseen = true;
            }
        }));
    }

    return (
        <Card className="w-[250px] md:w-[300px]" data-testid='connected_card'>
            <CardHeader className="flex gap-3">
                <>
                    <Link className="flex" href={`/connections/view-player/${connection.followedById}`}>
                        <p className="text-md primary-color-font font-semibold">{connection.followedByUName}</p>
                    </Link>
                    {unseen &&
                        <span className="absolute h-3 w-3 rounded-full bg-red-500 border-2 border-gray-500 top-2 right-2" />
                    }
                </>
            </CardHeader>
            <Divider />
            <CardBody>
                {connection.followedBy!.timezone != null &&
                    <p className="text-sm italic text-nowrap">{connection.followedBy!.timezone}</p>
                    // ||
                    // <p className="text-sm italic text-nowrap">No timezone...</p>
                    // ||
                    // <p></p>
                }
            </CardBody>
            <Divider />
            <CardFooter>
                <Link
                    showAnchorIcon
                    href={unseen ? `/connections/${connection.followingId}/${connection.followedById}` : `/connections/view-player/${connection.followedById}`}
                    className="text-sm"

                >
                    {/* {unseen &&
                        `Chat with ${connection.followedByUName}` ||
                        "Connect with player"
                    } */}
                    {`Chat with ${connection.followedByUName}`}
                </Link>
            </CardFooter>
        </Card>
    );
}
