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
                >
                    <select
                        id="selectID"
                        // defaultValue={user?.unsafeMetadata.timezone as string}
                        name="tzselectname"
                        value={selectedTimezone}
                        onChange={e => setSelectedTimezone(e.target.value)}
                        className={`p-2 italic w-full`}
                        required
                    >
                        <option disabled hidden label={user?.unsafeMetadata.timezone as string} />
                        {timezoneJSON.map((timezone) =>
                            <option key={timezone.text} value={timezone.text} label={timezone.text} />
                        )}
                    </select>
                </form>
                <div className={`flex gap-2 mt-3 justify-end " id="form_buttons ${editing ? '' : 'hidden'}`}>
                    <button
                        className="btn bg-red-500 p-2"
                    >
                        Cancel
                    </button>

                    <button type="submit" form="tzformid"
                        className={`btn bg-green-500 p-2`}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}