'use client'

import { sendMessagePrivate } from "@/actions"
import { useEffect, useState } from "react"

type TMessage = ({
    sentBy: {
        userName: string | null;
    };
    recievedBy: {
        userName: string | null;
    };
} & {
    createdAt: Date,
    sentById: string,
    recievedById: string,
    message: string
})

export default function Chat({ playerId }: { playerId: string }) {

    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState<TMessage[]>([])
    const [editing, setEditing] = useState(false)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {

        setLoading(true)

        fetch('http://localhost:3000/api/getPrivateMessages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                playerId
            })
        })
            .then((res) => res.json())
            .then((data) => {

                console.log("FML2", data.messages)
                console.log("FML3", data.messages[0].createdAt)
                setMessages(data.messages)
                setLoading(false)
            })
    }, [])

    if (isLoading) return <p>Loading...</p>

    const closeInput = () => {
        setEditing(false);
        setMessage("");
    }

    // adds playerId to server actions
    const updateWithPlayerId = sendMessagePrivate.bind(null, playerId)

    return (
        <div id="chat_container" className="flex flex-col">
            <div id="message_container"
                className="max-h-40 md:max-h-80 overflow-y-scroll"
            >
                {messages && messages.length > 0 &&
                    messages.map((m) => (
                        <div key={`${m.createdAt}`} className="p-2">
                            <p className="font-light tracking-wider">{`${`${m.createdAt.getUTCDate()}/${m.createdAt.getUTCMonth() + 1}/${m.createdAt.getUTCFullYear()}`} ${m.sentBy.userName}`}</p>
                            <p>{`${m.message}`}</p>
                        </div>
                    ))}
            </div>

            <form id="message_form" action={updateWithPlayerId}
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
        </div>
    )
}