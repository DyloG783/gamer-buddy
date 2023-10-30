"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import SubmitBio from "../lib/server_actions/SubmitBio"
import { useFormState } from 'react-dom'

export default function AboutYou({ bio }: { bio: string | null | undefined }) {

    const [editing, setEditing] = useState(false)
    const [input, setInput] = useState("")

    const savedBioFromDatabase = (bio: string | null | undefined) => {
        if (bio === null || bio === undefined) {
            const emptyPlaceholderText = 'Share something about yourself i.e. "My favourate genre is build/craft survival games." Or "Usually available to play between 6pm - 10pm weekdays in my timezone."'
            return emptyPlaceholderText
        }
        else return bio
    }

    const [inputValid, setInputvalid] = useState(false)

    // use effect for validation on input change
    useEffect(() => validate(), [input])

    // input validation method only showing submit button if valid input
    function validate() {
        setInputvalid(false)
        if (input.length >= 10) {
            if (input.length <= 500) {
                if (input != "") {
                    setInputvalid(true)
                }
            }
        }
    }

    // use form state using server action for form submit
    const [state, formAction] = useFormState(SubmitBio, null)


    return (
        <div className="p-2">
            <div className="flex justify-between">
                <label htmlFor="bio" className="font-bold pb-2">About you</label>
                <Image src="./edit_icon.svg"
                    onClick={() => setEditing(true)} height={0} width={0} alt="Edit button"
                    className={`w-4 md:w-7 ${editing ? 'hidden' : ''}`}
                />
                <button form="bioform" className={`${editing ? '' : 'hidden'}`}>
                    <Image src="./checkmark-icon.svg"
                        onClick={() => setEditing(false)}
                        height={0} width={0} alt="Submit button"
                        className={`w-4 md:w-7 ${inputValid ? '' : 'hidden'}
                        `}
                    />
                </button>
            </div>
            <div className={`${editing ? 'hidden' : ''} p-2 italic`}>{savedBioFromDatabase(bio)}</div>
            <div className={`${editing ? '' : 'hidden'}`}>
                <form id="bioform" action={formAction} className="flex justify-between ">
                    <textarea id="bio" minLength={10} maxLength={500}
                        className="shadow-sm text-sm md:text-base lg:text-lg
                    p-2 w-full h-16"
                        rows={20}
                        cols={50}
                        name="bioinputform"
                        placeholder={savedBioFromDatabase(bio)}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </form>
                <span className={`${inputValid ? 'hidden' : ''} text-red-400`}> 10 - 500 characters</span>
            </div>
        </div>
    )
}