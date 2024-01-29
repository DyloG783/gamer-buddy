"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Button, Textarea } from "@nextui-org/react"
import { SubmitButton } from "@/app/components/SubmitButton"

// export default function AboutYou({ bio }: { bio: string | null | undefined }) {
export default function AboutYou() {

    // state to manage whether editing is enabled
    const [editing, setEditing] = useState(false)

    // state for input into the text area
    const [input, setInput] = useState("")

    // state for input validation
    const [inputValid, setInputvalid] = useState(false)

    const { user } = useUser();
    const usMetadata = user?.unsafeMetadata;

    // use effect for validation on input change
    useEffect(() => {
        setInputvalid(false)

        if (input.length < 500) {
            setInputvalid(true)
        }

    }, [input]);

    function cancelFormSubmission() {
        setInput("");
        setEditing(false);
    }

    function handleSubmit(e: any) {
        e.preventDefault();

        if (!inputValid) {
            return;
        }

        user?.update({
            unsafeMetadata: {
                ...usMetadata,
                bio: input
            }
        });

        setEditing(false);
    }
    return (
        <div className={`p-2 `} >
            <h1 className="text-xl font-semibold mb-2 text-white">About You</h1>

            <form id="bioform" onSubmit={handleSubmit}>
                <Textarea
                    id="bio"
                    label={user?.unsafeMetadata.bio ? null : "Add something about yourself so others can know a little about you"}
                    className="w-full mt-2"
                    name="bioInputTextArea"
                    spellCheck="true"
                    size="lg"
                    value={input}
                    placeholder={user?.unsafeMetadata.bio ? user?.unsafeMetadata.bio as string : ""}
                    onChange={(e) => setInput(e.target.value)}
                    onClick={() => setEditing(true)}
                    onFocus={() => setEditing(true)}
                    maxLength={500}
                    onKeyDown={async (e) => {
                        if (e.key === "Enter") {
                            handleSubmit(e);
                        }
                    }}
                />
                <div id="form_buttons" className={`flex gap-2 mt-3 justify-end ${editing ? '' : 'hidden'}`} >
                    <span
                        className={`${inputValid ? 'hidden' : ''} text-red-400 italic text-sm mr-auto my-auto`}
                    >
                        No more than 500 characters friend!
                    </span>
                    <SubmitButton text="Submit" />
                    <Button
                        type="button"
                        onClick={() => cancelFormSubmission()}
                        color="warning"
                        data-testid='cancel_button'
                        variant="solid"
                        size='lg'
                        className={`text-sm tracking-wider text-white`}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    )
}