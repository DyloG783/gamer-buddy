import { Session } from "next-auth";
import ButtonAddGame from "./ButtonAddGame";
import ButtonRemoveGame from "./ButtonRemoveGame";
import ButtonConnect from "./ButtonConnect";


export default function GameActionBar(
    { session, alreadyExists, gameId, userEmail }:
        { session: Session | null, alreadyExists: boolean, gameId: number, userEmail: string | null | undefined }
) {
    return (
        <div id="gameActionsBar"
            className="flex flex-col gap-2 p-2 my-auto">
            {session
                &&
                <>
                    <div>
                        {alreadyExists
                            && <ButtonRemoveGame gameId={gameId} userEmail={userEmail} />
                            || <ButtonAddGame gameId={gameId} userEmail={userEmail} />
                        }

                    </div>
                    <div>
                        <ButtonConnect gameId={gameId} />
                    </div>

                </>
            }
        </div>
    )
}