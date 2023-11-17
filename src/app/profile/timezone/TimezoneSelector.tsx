"use client"

import { useState } from 'react';
import timezoneJSON from 'timezones.json';
import Image from 'next/image';
import SubmitTimezone from './SubmitTimezone';
import { useFormState } from 'react-dom';
import EditCancelSubmitButton from '@/app/profile/EditCancelSubmitButton';

export default function TimezoneSelector({ userTimezone }: { userTimezone: string | null | undefined }) {

    // const [selectedTimezone, setSelectedTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
    const [selectedTimezone, setSelectedTimezone] = useState('')

    // state to manage whether editing is enabled
    const [editing, setEditing] = useState(false);

    // part of server action
    const initialState = {
        message: null,
    }

    // use form state using server action for form submit to databse
    const [state, formAction] = useFormState(SubmitTimezone, initialState)

    // converting timezone JSON into array to map out select form options
    const tzArray = []
    for (let i in timezoneJSON) {
        tzArray.push(timezoneJSON[i].text)
    }

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
                    <button type="submit" form="formID" className={`${editing ? '' : 'hidden'}`}>
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
                    {tzArray.map((timezone) =>
                        <option key={timezone} value={timezone} label={timezone} />
                    )}
                </select>
            </form>
        </>
    )
}