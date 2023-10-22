"use client"

import Image from "next/image";
import { useState } from "react";
import { experimental_useFormState as useFormState } from 'react-dom'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SubmitUsername from "../server_actions/SubmitUsername";

export default function Username({ userName }: { userName: string }) {

    // state to manage whether editing is enabled
    const [editing, setEditing] = useState(false);

    // state to manage form input changes
    const [input, setInput] = useState('')

    // client side session status check to redirect to log in not authed
    const { data: session, status } = useSession()
    const router = useRouter()
    if (status === "unauthenticated") {
        router.push('/api/auth/signin')
    }

    // use form state experimental
    const initialState = {
        message: null,
    }
    // use form state using server action for form submit
    const [state, formAction] = useFormState(SubmitUsername, initialState)

    return (
        <div className="flex flex-col p-2 text-sm md:text-base lg:text-lg">
            <label htmlFor="username" className="font-bold">Username</label>
            <div className={`${editing ? 'hidden' : ''} flex justify-between `}>
                <div className={`p-2 italic`}>{userName}</div>
                <Image src="./edit_icon.svg"
                    onClick={() => setEditing(true)} height={0} width={0} alt="Edit button"
                    className={`w-4 md:w-7 ${editing ? 'hidden' : ''}`}
                />
            </div>
            <div className={`${editing ? '' : 'hidden'} p-2`}>
                <form action={formAction} className="flex justify-between">
                    <input
                        id="username"
                        name="usernameform"
                        type="text"
                        placeholder={userName}
                        value={input}
                        className={`border-cyan-700 border-2 `}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit">
                        <Image src="./checkmark-icon.svg"
                            onClick={() => setEditing(false)} height={0} width={0} alt="Submit button"
                            className={`w-4 md:w-7 ${editing ? '' : 'hidden'}`}
                        />
                    </button>
                </form>
            </div>
        </div>
    )
}