import { IGame } from "@/app/lib/custom_types";
import prisma from "@/app/lib/db";

interface IGameProps {
    game: IGame
}

const Game: React.FC<IGameProps> = async ({ game }) => {



    return (
        <div>

        </div>
    )
}


export default Game;