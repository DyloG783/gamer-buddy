"use client"

import { useState } from 'react';
import timezoneJSON from 'timezones.json';
import Image from 'next/image';
import SubmitTimezone from './SubmitTimezone';
import { useFormState, useFormStatus } from 'react-dom';

export default function TimezoneSelector({ userTimezone }: { userTimezone: string | null | undefined }) {

    // const [selectedTimezone, setSelectedTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
    const [selectedTimezone, setSelectedTimezone] = useState('')

    // state to manage whether editing is enabled
    const [editing, setEditing] = useState(false);

    // this needs to be passed to useFormState to get a success or error message back from db write
    // causing red squigly under userFormState but this is how it should work from the docs... 
    const initialState = {
        message: null,
    }

    // use form state using server action for form submit to databse
    const [state, formAction] = useFormState(SubmitTimezone, initialState)

    // pending state to disable submit button whileserver action completes
    const { pending } = useFormStatus()

    // can't use 'EditCancelSubmitButton' with this select form/form action becauase null
    // keeps getting send to the server
    return (
        <>
            <div id="editControlsLabel" className='flex justify-between p-2'>
                <label htmlFor="selectID" className='font-bold'>Select your timezone</label>
                <Image src="./edit_icon.svg"
                    onClick={() => setEditing(true)} height={0} width={0} alt="Edit button"
                    className={`w-4 md:w-7 ${editing ? 'hidden' : ''}`}
                />
                <div className={`flex gap-2 ${editing ? '' : 'hidden'}`}>
                    <button
                        type="submit"
                        form="formID"
                        className={`${editing ? '' : 'hidden'}`}
                        aria-disabled={pending}
                    >
                        <Image src="./checkmark-icon.svg" height={0} width={0} alt="Submit button"
                            className={`w-4 md:w-7`}
                        />
                    </button>
                    <Image src="./red_cross.svg"
                        onClick={() => setEditing(false)}
                        height={0} width={0} alt="Cancel edit button"
                        className={`w-4 md:w-7 ${editing ? '' : 'hidden'}`}
                    />
                </div>
            </div>
            <form id="formID" name="formName" action={formAction} onSubmit={() => setEditing(false)}>
                <select
                    id="selectID"
                    name="selectInput"
                    value={selectedTimezone}
                    onChange={e => setSelectedTimezone(e.target.value)}
                    disabled={!editing}
                    className={`p-2 italic w-full`}
                    required
                >
                    <option disabled hidden label={userTimezone as string} />
                    {timezoneJSON.map((timezone) =>
                        <option key={timezone.text} value={timezone.text} label={timezone.text} />
                    )}
                </select>
                <p aria-live="polite" className="sr-only">
                    {state?.message}
                </p>
            </form>
        </>
    )
}