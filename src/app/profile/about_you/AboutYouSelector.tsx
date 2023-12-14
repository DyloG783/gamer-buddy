"use client"

import { useEffect, useState } from "react"
import EditCancelSubmitButton from "@/app/profile/componenets/EditCancelSubmitButton"
import SubmitBio from "./SubmitAboutYou"
import { useFormState } from 'react-dom'

export default function AboutYou({ bio }: { bio: string | null | undefined }) {

    // state to manage whether editing is enabled
    const [editing, setEditing] = useState(false)

    // state for input into the text area
    const [input, setInput] = useState("")

    // this needs to be passed to useFormState to get a success or error message back from db write
    // causing red squigly under userFormState but this is how it should work from the docs... 
    const initialState = {
        message: null,
    }

    // use form state using server action for form submit
    const [state, formAction] = useFormState(SubmitBio, initialState)

    // state for input validation
    const [inputValid, setInputvalid] = useState(false)

    // use effect for validation on input change
    useEffect(() => {

        setInputvalid(false)

        if (input.length >= 10) {
            if (input.length <= 500) {
                if (input != "") {
                    setInputvalid(true)
                }
            }
        }
    }, [input])

    const savedBioFromDatabase = (bio: string | null | undefined) => {
        if (bio === null || bio === undefined) {
            const emptyPlaceholderText = 'Share something about yourself i.e. "My favourate genre is build/craft survival games." Or "Usually available to play between 6pm - 10pm weekdays in my timezone."'
            return emptyPlaceholderText
        }
        else return bio
    }

    return (
        <div className="p-2">
            <EditCancelSubmitButton editing={editing} inputValid={inputValid}
                label="About You" setEditing={setEditing} submitFormName="bioform"
            />
            <div className={`${editing ? 'hidden' : ''} p-2 italic`}>{savedBioFromDatabase(bio)}</div>
            <div className={`${editing ? '' : 'hidden'}`}>
                <form
                    id="bioform"
                    action={formAction}
                    className="flex justify-between">
                    <textarea id="bio" minLength={10} maxLength={500}
                        className="shadow-sm text-sm md:text-base lg:text-lg
                            p-2 w-full h-16"
                        rows={20}
                        cols={50}
                        name="bioInputTextArea"
                        placeholder={savedBioFromDatabase(bio)}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        required
                    />
                    <p aria-live="polite" className="sr-only">
                        {state?.message}
                    </p>
                </form>
                <span className={`${inputValid ? 'hidden' : ''} text-red-400`}> 10 - 500 characters</span>
            </div>
        </div>
    )
}