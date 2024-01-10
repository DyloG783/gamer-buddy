"use client"

import { sendMessagePrivate } from "@/lib/actions"
import { useRef, useState } from "react"

export default function Form({ privateRoomId }: { privateRoomId: string }) {
    const [message, setMessage] = useState("")
    const [editing, setEditing] = useState(false)
    const formRef = useRef<HTMLFormElement>(null);

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
                className="p-4">
                <input
                    name="message_input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onClick={() => setEditing(true)}
                    required
                    maxLength={500}
                    className={`w-full p-4 min-h-[100px]`}
                />
            </form>
            <div id="form_buttons" className="flex gap-2 mt-3 justify-end p-2">
                {/* <span className={`${inputValid ? 'hidden' : ''} text-red-400 mb-2`}> 10 - 500 characters</span> */}
                <button type="reset"
                    onClick={closeInput}
                    className={`btn bg-red-400 p-2
                    ${editing ? '' : 'hidden'}`}
                >
                    Cancel
                </button>
                <button type="submit" form="message_form"
                    className={`btn bg-green-500 p-2 ${editing ? '' : 'hidden'}`}

                >
                    Send
                </button>
            </div>
        </>
    )
}