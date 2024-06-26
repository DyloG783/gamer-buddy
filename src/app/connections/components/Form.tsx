"use client"

import { SubmitButton } from "@/app/components/buttons/SubmitButton"
import { sendMessagePrivate } from "@/lib/actions"
import { Button, Textarea } from "@nextui-org/react"
import { useState } from "react"

export default function Form({ privateRoomId, playerId }: { privateRoomId: string, playerId: string }) {
    const [message, setMessage] = useState("")
    const [editing, setEditing] = useState(false)

    function closeInput() {
        setMessage("");
        setEditing(false);
    }

    const bindData = {
        privateRoomId: privateRoomId,
        playerId: playerId
    }

    // adds playerId + private room to server action
    const bindedAction = sendMessagePrivate.bind(null, bindData)

    // keyboard 'enter' key submit should keep editing state open and only reset text
    async function handleKeyFormSubmit(formData: FormData) {
        await bindedAction(formData);
        setMessage("");
    }

    // Click 'send' button submit should close editing and reset text
    async function handleClickFormSubmit(formData: FormData) {
        if (message === "") {
            setEditing(false);
            return;
        };
        await bindedAction(formData);
        closeInput();
    }

    return (
        <>
            <form
                id="form_id"
                action={(formData) => handleClickFormSubmit(formData)}
            >
                <Textarea
                    label="Enter your message"
                    className="w-full mt-2"
                    name="message_input"
                    spellCheck="true"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onClick={() => setEditing(true)}
                    onFocus={() => setEditing(true)}
                    maxLength={500}
                    onKeyDown={async (e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            if (message === "") return;
                            const formData = new FormData();
                            formData.append('message_input', message);
                            handleKeyFormSubmit(formData);
                        }
                    }}
                />
                <div id="form_buttons" className={`flex gap-2 mt-3 justify-end p-2 ${editing ? '' : 'hidden'}`}>
                    <Button type="reset" color="warning"
                        onClick={closeInput}
                        data-testid='cancel_button'
                        variant="solid"
                        size='lg'
                        className={`text-sm tracking-wider text-white`}
                    >
                        Cancel
                    </Button>
                    <SubmitButton text={`Send`} formId="form_id" />
                </div>
            </form>
        </>
    )
}