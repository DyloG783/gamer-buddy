"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"

// export default function AboutYou({ bio }: { bio: string | null | undefined }) {
export default function AboutYou() {

    // state to manage whether editing is enabled
    const [editing, setEditing] = useState(false)

    // state for input into the text area
    const [input, setInput] = useState("")

    // state for input validation
    const [inputValid, setInputvalid] = useState(false)

    // use effect for validation on input change
    useEffect(() => {
        setInputvalid(false)

        if (input.length !== 0) {
            setEditing(true)
        }

        if (input.length >= 10) {
            if (input.length < 500) {
                if (input != "") {
                    setInputvalid(true)
                }
            }
        }
    }, [input]);

    function cancelFormSubmission() {
        setInput("");
        setEditing(false);
    }



    const { user } = useUser();
    const usMetadata = user?.unsafeMetadata;

    return (
        <div className={`p-2 `} >
            <h1 className="text-xl font-semibold mb-2 text-blue-700">About You</h1>


            <form
                id="bioform"
                onSubmit={() => {
                    user?.update({
                        unsafeMetadata: {
                            ...usMetadata,
                            bio: input
                        }
                    })

                    setEditing(false)
                }}
            >
                <textarea id="bio" minLength={10} maxLength={500}
                    className="shadow-sm
                            p-2 w-full "
                    rows={10}
                    name="bioInputTextArea"
                    placeholder={user?.unsafeMetadata.bio ? user?.unsafeMetadata.bio as string : 'Add something pal!'}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    required
                />
            </form>
            <div className={`flex gap-2 mt-3 justify-end ${editing ? '' : 'hidden'}`} id="form_buttons">
                <span className={`${inputValid ? 'hidden' : ''} text-red-400 mb-2`}> 10 - 500 characters</span>
                <button type="submit" form="bioform"
                    className={`btn-primary p-2 ${inputValid ? '' : 'hidden'}`}
                >
                    Submit
                </button>
                <button
                    onClick={() => cancelFormSubmission()}
                    className="btn-cancel"
                >
                    Cancel
                </button>
            </div>


        </div>
    )
}