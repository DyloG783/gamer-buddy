'use client'

import ButtonAddGame from "./ButtonAddGame";
import ButtonRemoveGame from "./ButtonRemoveGame";
import ButtonConnect from "./ButtonConnect";
import { IGame } from "@/lib/custom_types";
import { useState } from "react";

export default function GameActionBar({ alreadyExists, game }: { alreadyExists: boolean, game: IGame }) {

    // using this state purely to force ui update on save/remove game, otherwise bad ux as button changes from backend
    const [exists, setExists] = useState(alreadyExists)

    return (
        <div id="gameActionsBar"
            className="flex flex-col gap-2 p-2 my-auto">
            <div>
                {exists
                    && <ButtonRemoveGame game={game} setExists={setExists} />
                    || <ButtonAddGame game={game} setExists={setExists} />
                }
            </div>
            <div>
                {exists && <ButtonConnect game={game} />}
            </div>
        </div>
    )
}