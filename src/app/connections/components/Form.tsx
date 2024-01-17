"use client"

import { sendMessagePrivate } from "@/lib/actions"
import { Textarea } from "@nextui-org/react"
import { useEffect, useRef, useState } from "react"

export default function Form({ privateRoomId }: { privateRoomId: string }) {
    const [message, setMessage] = useState("")
    const [editing, setEditing] = useState(false)
    const [inputValid, setInputvalid] = useState(false) // state for input validation
    const formRef = useRef<HTMLFormElement>(null);

    // use effect for validation on input change
    useEffect(() => {
        setInputvalid(false)

        if (message.length > 0) {
            if (message.length < 500) {
                setInputvalid(true)
            }
        }
    }, [message]);

    const closeInput = () => {
        setEditing(false);
        setMessage("");
    }

    // adds playerId to server action
    const updateWithPrivateRoomId = sendMessagePrivate.bind(null, privateRoomId)

    return (
        <>
            <form
                id="message_form"
                action={async (formData) => {
                    await updateWithPrivateRoomId(formData)
                    formRef.current?.reset();
                }}
                onSubmit={closeInput}
                ref={formRef}
            >
                <Textarea
                    label="Type here"
                    placeholder="Enter your description"
                    className="w-full mt-2"
                    name="message_input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onClick={() => setEditing(true)}
                    maxLength={500}
                />
            </form>
            <div id="form_buttons" className={`flex gap-2 mt-3 justify-end p-2 ${editing ? '' : 'hidden'}`}>
                <button type="reset"
                    onClick={closeInput}
                    className={`btn-cancel `}
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