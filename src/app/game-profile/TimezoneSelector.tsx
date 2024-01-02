"use client"

import { ChangeEvent, useState } from 'react';
import timezoneJSON from 'timezones.json';
import { useUser } from '@clerk/nextjs';

export default function TimezoneSelector() {

    // const [selectedTimezone, setSelectedTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
    const [selectedTimezone, setSelectedTimezone] = useState('')

    // state to manage whether editing is enabled
    const [editing, setEditing] = useState(false);

    const { user } = useUser();
    const usMetadata = user?.unsafeMetadata;

    // function clearSelection() {
    //     document.getElementById('selectID')!.onclick = () => {
    //         dropDownListObject.value = null;
    //     }
    // }

    return (
        <div className={`p-2 mt-2`} >
            <h1 className="text-xl font-semibold mb-2 text-blue-700">Timezone</h1>
            <div className={` p-2 hover:shadow-lg`}
                onClick={() => setEditing(true)}
            >

                <form id="tzformid" name="formName"
                    onSubmit={() => user?.update({
                        unsafeMetadata: {
                            ...usMetadata,
                            timezone: selectedTimezone
                        }
                    })}
                // onClick={() => setEditing(true)}
                >
                    <select
                        id="selectID"
                        name="tzselectname"
                        value={selectedTimezone}
                        onChange={e => setSelectedTimezone(e.target.value)}
                        // disabled={!editing}
                        className={`p-2 italic w-full`}
                        required
                    >
                        {/* <option disabled selected hidden label={'placeholderusertimezone'} /> */}
                        <option disabled hidden label={user?.unsafeMetadata.timezone as string} />
                        {timezoneJSON.map((timezone) =>
                            <option key={timezone.text} value={timezone.text} label={timezone.text} />
                        )}
                    </select>
                </form>
                <div className={`flex gap-2 mt-3 justify-end " id="form_buttons ${editing ? '' : 'hidden'}`}>
                    {/* <span className={`${inputValid ? 'hidden' : ''} text-red-400 mb-2`}> 10 - 500 characters</span> */}
                    <button
                        // onClick={() => setEditing(false)}
                        // onClick={() => clearSelection()}
                        className="btn bg-red-400 p-2"
                    >
                        Cancel
                    </button>

                    <button type="submit" form="tzformid"
                        className={`btn bg-green-400 p-2 `}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}