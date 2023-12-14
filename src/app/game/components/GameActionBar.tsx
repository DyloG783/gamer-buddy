'use client'

import { Session } from "next-auth";
import ButtonAddGame from "./ButtonAddGame";
import ButtonRemoveGame from "./ButtonRemoveGame";
import ButtonConnect from "./ButtonConnect";
import { IGame } from "@/lib/custom_types";
import { useState } from "react";

export default function GameActionBar(
    { session, alreadyExists, game, userEmail }:
        { session: Session | null, alreadyExists: boolean, game: IGame, userEmail: string | null | undefined }
) {

    // using this state purely to fore ui update on save/remove game, otherwise bad ux as button changes
    const [exists, setExists] = useState(alreadyExists)

    return (
        <div id="gameActionsBar"
            className="flex flex-col gap-2 p-2 my-auto">
            {session
                &&
                <>
                    <div>
                        {exists
                            && <ButtonRemoveGame game={game} userEmail={userEmail} setExists={setExists} />
                            || <ButtonAddGame game={game} userEmail={userEmail} setExists={setExists} />
                        }
                    </div>
                    <div>
                        {exists && <ButtonConnect game={game} />}
                    </div>
                </>
            }
        </div>
    )
}