"use client"

import EditCancelSubmitButton from "@/app/profile/EditCancelSubmitButton";
import { useEffect, useState } from "react";
import { useFormState } from 'react-dom'
import SubmitUsername from "./SubmitUsername";

export default function Username({ userName }: { userName: string | null | undefined }) {

    // state to manage whether editing is enabled
    const [editing, setEditing] = useState(false);

    // state to manage form input changes
    const [input, setInput] = useState("")

    // state to manage input was valid to show submit buttonm
    const [inputValid, setInputvalid] = useState(false)

    // part of server action
    const initialState = {
        message: null,
    }
    // use form state using server action for form submit
    const [state, formAction] = useFormState(SubmitUsername, initialState)

    // use effect for validation on input change
    useEffect(() => validate(), [input])

    // input validation method only showing submit button if valid input
    function validate() {
        setInputvalid(false)
        if (input.length >= 3) {
            if (input.length <= 15) {
                if (input != "") {
                    setInputvalid(true)
                }
            }
        }
    }

    return (
        <div className="p-2 text-sm md:text-base lg:text-lg">
            <EditCancelSubmitButton
                setEditing={setEditing} editing={editing}
                label="Username" inputValid={inputValid}
                submitFormName="unameform"
            />
            <div className={`${editing ? 'hidden' : ''} p-2 italic`}>{userName}</div>
            <div className={`${editing ? '' : 'hidden'} p-2`}>
                <form id="unameform" action={formAction} className="flex justify-between">
                    <input
                        id="usernameID"
                        name="usernameInput"
                        type="text"
                        placeholder={userName === null || undefined ? '' : userName}
                        value={input}
                        autoComplete="username"
                        className="shadow-sm w-full h-10"
                        onChange={(e) => setInput(e.target.value)}
                        required
                    />
                </form>
                <span className={`${inputValid ? 'hidden' : ''} text-red-400`}> 3 - 15 characters</span>
            </div>
        </div>
    )
}