"use client";

import { useEffect, useState } from "react";
import { sendMessageForum } from "@/lib/actions";
import { Button, Textarea } from "@nextui-org/react";
import { SubmitButton } from "@/app/components/SubmitButton";

export default function Form({ gameRoomId }: { gameRoomId: string }) {
    const [message, setMessage] = useState("");
    const [editing, setEditing] = useState(false);

    const closeInput = () => {
        setEditing(false);
        setMessage("");
    }

    // adds gameRoomId to server action
    const updateWithForumId = sendMessageForum.bind(null, gameRoomId);

    async function handleFormSubmit(formData: FormData) {
        await updateWithForumId(formData);
        closeInput();
    }

    return (
        <>
            <form id="form_id"
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
                <div id="form_buttons" className={`flex gap-2 mt-3 justify-end p-2 ${editing ? '' : 'hidden'}`} >
                    <Button type="button" onClick={closeInput} color="danger"
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