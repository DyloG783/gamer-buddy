'use client'

import { Session } from "next-auth";
import ButtonAddGame from "./ButtonAddGame";
import ButtonRemoveGame from "./ButtonRemoveGame";
import ButtonConnect from "./ButtonConnect";
import { IGame } from "@/lib/custom_types";
import { useState } from "react";

export default function GameActionBar(
    { session, alreadyExists, game }:
        { session: Session, alreadyExists: boolean, game: IGame }
) {

    // using this state purely to force ui update on save/remove game, otherwise bad ux as button changes
    const [exists, setExists] = useState(alreadyExists)

    return (
        <div id="gameActionsBar"
            className="flex flex-col gap-2 p-2 my-auto">
            <div>
                {exists
                    && <ButtonRemoveGame game={game} userEmail={session.user?.email} setExists={setExists} />
                    || <ButtonAddGame game={game} userEmail={session.user?.email} setExists={setExists} />
                }
            </div>
            <div>
                {exists && <ButtonConnect game={game} />}
            </div>
        </div>
    )
}