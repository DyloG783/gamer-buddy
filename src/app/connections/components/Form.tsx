"use client"

import { sendMessagePrivate } from "@/lib/actions"
import { Textarea } from "@nextui-org/react"
import { useEffect, useState } from "react"

export default function Form({ privateRoomId }: { privateRoomId: string }) {
    const [message, setMessage] = useState("")
    const [editing, setEditing] = useState(false)
    const [inputValid, setInputvalid] = useState(false) // state for input validation

    // use effect for validation on input change
    useEffect(() => {
        setInputvalid(false)

        if (message.length > 0) {
            if (message.length < 500) {
                setInputvalid(true)
            }
        }
    }, [message]);


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
                id="message_form"
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
            </form>
            <div id="form_buttons" className={`flex gap-2 mt-3 justify-end p-2 ${editing ? '' : 'hidden'}`}>
                <button type="reset"
                    onClick={closeInput}
                    className={`btn-cancel`}
                >
                    Cancel
                </button>
                <button type="submit" form="message_form"
                    className={`btn-primary ${inputValid ? '' : 'hidden'} `}
                >
                    Send
                </button>
            </div>
        </>
    )
}