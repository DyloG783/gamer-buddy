"use client";

import { useRef, useState } from "react";
import { sendMessageForum } from "@/lib/actions"

export default function Form({ gameRoomId }: { gameRoomId: string }) {
    const [message, setMessage] = useState("")
    const [editing, setEditing] = useState(false)
    const formRef = useRef<HTMLFormElement>(null);

    const closeInput = () => {
        setEditing(false);
        setMessage("");
    }

    // adds gameRoomId to server action
    const updateWithForumId = sendMessageForum.bind(null, gameRoomId);

    return (
        <>
            <form id="message_form"
                action={async (formData) => {
                    await updateWithForumId(formData);
                    formRef.current?.reset();
                }}
                onSubmit={closeInput}
                className="p-4"
                ref={formRef}
            >
                <textarea
                    name="message_input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onClick={() => setEditing(true)}
                    required
                    maxLength={500}
                    className={`w-full p-4 min-h-[50px]`}
                />
            </form>
            <div id="form_buttons" className="flex gap-2 mt-3 justify-end p-2">
                <button type="reset"
                    onClick={closeInput}
                    className={`btn-cancel ${editing ? '' : 'hidden'}`}
                >
                    Cancel
                </button>
                <button type="submit" form="message_form"
                    className={`btn-primary ${editing ? '' : 'hidden'}`}

                >
                    Send
                </button>
            </div>
        </>

    )
}