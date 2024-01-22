"use client"

import { SubmitButton } from "@/app/components/SubmitButton"
import { sendMessagePrivate } from "@/lib/actions"
import { Button, Textarea } from "@nextui-org/react"
import { useState } from "react"

export default function Form({ privateRoomId }: { privateRoomId: string }) {
    const [message, setMessage] = useState("")
    const [editing, setEditing] = useState(false)

    function closeInput() {
        setMessage("");
        setEditing(false);
    }

    // adds playerId to server action
    const updateWithPrivateRoomId = sendMessagePrivate.bind(null, privateRoomId)

    async function handleFormSubmit(formData: FormData) {
        await updateWithPrivateRoomId(formData);
        closeInput();
    }

    return (
        <>
            <form
                id="form_id"
                action={(formData) => handleFormSubmit(formData)}
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
                            handleFormSubmit(formData);
                        }
                    }}
                />
                <div id="form_buttons" className={`flex gap-2 mt-3 justify-end p-2 ${editing ? '' : 'hidden'}`}>
                    <Button type="reset" color="danger"
                        onClick={closeInput}
                        data-testid='cancel_button'
                        variant="solid"
                        size='lg'
                        className={`text-sm tracking-wider`}
                    >
                        Cancel
                    </Button>
                    <SubmitButton text={`Send`} formId="form_id" />
                </div>
            </form>
        </>
    )
}