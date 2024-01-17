import { IGame } from "@/lib/custom_types";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@nextui-org/react";


// type "your" means you already have this game, type "all" means you don't have this game saved
// they will display different information and link to other places
export default function GameCard({ game, type }: { game: IGame, type: string }) {

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
                {/* <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={40}
                /> */}
                {type === "your" &&
                    <Link className="flex" href={`/game/${game.id}`}>
                        <p className="text-md primary-color-font font-semibold">{game.name}</p>
                        {/* <p className="text-small text-default-500">test text</p> */}
                    </Link>
                }
                {type === "all" &&
                    <Link className="flex" href={`${game.url}`} target="_blank">
                        <p className="text-md primary-color-font font-semibold">{game.name}</p>
                        {/* <p className="text-small text-default-500">test text</p> */}
                    </Link>
                }

            </CardHeader>
            <Divider />
            <CardBody>
                <p className="text-sm">Other players <span className="primary-color-font">{game._count?.users}</span></p>
                {type === "all" &&
                    <>
                        <Divider className="my-2" />
                        <div className="overflow-hidden">
                            <h3 className="font-bold text-blue-700">Genre</h3>
                            {game.genres.map((genre: string) => (
                                <span key={genre} className="">
                                    {genre + ", "}
                                </span>
                            ))}
                        </div>
                        <Divider className="my-2" />
                        <div className="overflow-hidden">
                            <h3 className="font-bold text-blue-700">Mode</h3>
                            {game.modes.map((mode: string) => (
                                <span key={mode} className="">
                                    {mode + ", "}
                                </span>
                            ))}
                        </div>
                        <Divider className="my-2" />
                        <div className="overflow-hidden">
                            <h3 className="font-bold text-blue-700">Platform</h3>
                            {game.platforms.map((platform: string) => (
                                <span key={platform} className="">
                                    {platform + ", "}
                                </span>
                            ))}
                        </div>
                        <Divider className="my-2" />
                        <div className="overflow-hidden">
                            <h3 className="font-bold text-blue-700">Release date</h3>
                            <span className="">{releaseDate.toLocaleString(undefined, options)}</span>
                        </div>
                    </>
                }
            </CardBody>
            <Divider />
            <CardFooter>
                <Link
                    showAnchorIcon
                    href={type === "your" ? `/connect/${game.id}` : `/game/${game.id}`}
                    className="text-xs "
                >
                    {type === 'your' ? 'Checkout who else is playing' : 'View game'}
                </Link>
            </CardFooter>
        </Card>
    );
}

