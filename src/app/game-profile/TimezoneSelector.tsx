"use client"

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import timezoneJSON from 'timezones.json';

export default function TimezoneSelector() {

    // const [selectedTimezone, setSelectedTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
    const [selectedTimezone, setSelectedTimezone] = useState('')

    // state to manage whether editing is enabled
    const [editing, setEditing] = useState(false);

    const { user } = useUser();
    const usMetadata = user?.unsafeMetadata;

    function cancelSubmission() {
        setEditing(false);
        setSelectedTimezone('');
    }

    return (
        <div className={`p-2 mt-2`} >
            <h1 className="text-xl font-semibold mb-2 text-blue-700">Timezone</h1>
            <div className={`mb-4 p-4 hover:shadow-lg`}
            >

                <form id="tzformid" name="formName"
                    onSubmit={() => user?.update({
                        unsafeMetadata: {
                            ...usMetadata,
                            timezone: selectedTimezone
                        }
                    })}
                >
                    <select
                        id="selectID"
                        // defaultValue={user?.unsafeMetadata.timezone as string}
                        name="tzselectname"
                        value={selectedTimezone}
                        onChange={e => setSelectedTimezone(e.target.value)}
                        onClick={() => setEditing(true)}
                        className={`p-2 italic w-full`}
                        required
                    >
                        <option disabled hidden label={user?.unsafeMetadata.timezone ? user?.unsafeMetadata.timezone as string : "Select a time-zone"} />
                        {timezoneJSON.map((timezone) =>
                            <option key={timezone.text} value={timezone.text} label={timezone.text} />
                        )}
                    </select>
                </form>
            </div>
            <div className='flex justify-between'>
                <div></div>
                <div id="buttons"
                    className={`flex gap-2 mt-3" ${editing ? '' : 'hidden'}`}
                >
                    <button type="submit" form="tzformid"
                        className={`btn-primary`}
                    >
                        Submit
                    </button>
                    <button
                        className="btn-cancel"
                        onClick={() => cancelSubmission()}
                    >
                        Cancel
                    </button>
                </div>
            </div>

        </div>
    )
}