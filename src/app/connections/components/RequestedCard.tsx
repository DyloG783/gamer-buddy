import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@nextui-org/react";
import { IConnection } from "@/lib/custom_types";

export default function RequestedCard({ connection }: { connection: IConnection }) {

    return (
        <Card className="w-[250px] md:w-[300px]" data-testid='requested_card'>
            <CardHeader className="flex gap-3">
                <Link className="flex" href={`/connections/view-player/${connection.followedById}`}>
                    <p className="text-md primary-color-font font-semibold">{connection.followedByUName}</p>
                </Link>
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
                    href={`/connections/view-player/${connection.followedById}`}
                    className="text-sm"
                >
                    Connect with player
                </Link>
            </CardFooter>
        </Card>
    );
}
