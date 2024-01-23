import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@nextui-org/react";
import { IConnection } from "@/lib/custom_types";

export default function FollowingCard({ connection }: { connection: IConnection }) {
    return (
        <Card className="w-[250px] md:w-[300px]" data-testid='following_card'>
            <CardHeader className="flex gap-3">
                <Link className="flex" href={`/connections/view-player/${connection.followingId}`}>
                    <p className="text-md primary-color-font font-semibold">{connection.followingUName}</p>
                </Link>
            </CardHeader>
            <Divider />
            <CardBody>
                {connection.following!.timezone != null &&
                    <p className="text-sm italic text-nowrap">{connection.following!.timezone}</p>
                    // ||
                    // <p className="h-4">following</p>
                }
            </CardBody>
            <Divider />
            <CardFooter>
                <Link
                    showAnchorIcon
                    href={`/connections/view-player/${connection.followingId}`}
                    className="text-sm"
                >
                    Connect with player
                </Link>
            </CardFooter>
        </Card>
    );
}
