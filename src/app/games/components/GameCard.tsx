import { GameSchema } from '@/lib/zod_schemas';
import z from 'zod';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@nextui-org/react";


// type "your" means you already have this game, type "all" means you don't have this game saved
// they will display different information and link to other places
export default function GameCard({ game, type }: { game: z.infer<typeof GameSchema>, type: string }) {

    const unixTimestamp = game.firstReleaseDate;
    const timestamp = unixTimestamp! * 1000;
    const releaseDate = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
    };

    return (
        <Card className="w-[250px] md:w-[300px] ">
            <CardHeader className="flex">
                <Link className="flex" href={`/game/${game.id}`}>
                    <p className="text-md primary-color-font font-semibold">{game.name}</p>
                </Link>
            </CardHeader>
            <Divider />
            <CardBody>
                <p className="text-sm">Other players: <span className="primary-color-font">{game._count?.users}</span>
                </p>
                {type === "all" &&
                    <>
                        <Divider className="my-2" />
                        <div className="overflow-hidden">
                            <h3 className="font-bold blue-font">Genre</h3>
                            {game.genres.map((genre: string) => (
                                <span key={genre} >
                                    {genre + ", "}
                                </span>
                            ))}
                        </div>
                        <Divider className="my-2" />
                        <div className="overflow-hidden">
                            <h3 className="font-bold blue-font">Mode</h3>
                            {game.modes.map((mode: string) => (
                                <span key={mode} >
                                    {mode + ", "}
                                </span>
                            ))}
                        </div>
                        <Divider className="my-2" />
                        <div className="overflow-hidden">
                            <h3 className="font-bold blue-font">Platform</h3>
                            {game.platforms.map((platform: string) => (
                                <span key={platform} >
                                    {platform + ", "}
                                </span>
                            ))}
                        </div>
                        <Divider className="my-2" />
                        <div className="overflow-hidden">
                            <h3 className="font-bold text-blue-700">Release date</h3>
                            <span suppressHydrationWarning>{releaseDate.toLocaleString(undefined, options)}</span>
                        </div>
                    </>
                }
            </CardBody>
            <Divider />
            <CardFooter>
                <Link
                    showAnchorIcon
                    href={type === "your" ? `/connect/${game.id}` : `${game.url}`}
                    className="text-xs "
                    target={type === 'your' ? "_self" : "_blank"}
                >
                    {type === 'your' ? 'Chat with others' : 'View game on IGDB'}
                </Link>
            </CardFooter>
        </Card>
    );
}

