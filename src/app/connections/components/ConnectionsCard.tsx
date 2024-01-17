import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";

export default function ConnectionsCard({ connection, type }: { connection: any, type: string }) {
    return (
        <Card className="w-[250px] md:w-[300px]">
            <CardHeader className="flex gap-3">
                {/* <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={40}
                /> */}
                {type === 'connectedOrRequest' &&
                    <p className="text-md primary-color-font font-semibold">{connection.followedByUName}</p>
                }
                {type === 'following' &&
                    <p className="text-md primary-color-font font-semibold">{connection.followingUName}</p>
                }

            </CardHeader>
            <Divider />
            <CardBody>
                {type === "connectedOrRequest" && connection.followedBy.timezone != null &&
                    <p className="text-sm italic text-nowrap">{connection.followedBy.timezone}</p>
                    // ||
                    // <p className="text-sm italic text-nowrap">No timezone...</p>
                    // ||
                    // <p></p>
                }
                {type === "following" && connection.following.timezone != null &&
                    <p className="text-sm italic text-nowrap">{connection.following.timezone}</p>
                    // ||
                    // <p className="h-4">following</p>
                }
            </CardBody>
            <Divider />
            <CardFooter>
                <Link
                    showAnchorIcon
                    href={type === "connectedOrRequest" ? `/connections/view-player/${connection.followedById}` : `/connections/view-player/${connection.followingId}`}
                    className="text-sm"
                >
                    Connect with player
                </Link>
            </CardFooter>
        </Card>
    );
}
