"use client"

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import timezoneJSON from 'timezones.json';
import { Select, SelectItem } from "@nextui-org/react";

export default function TimezoneSelector() {

    const [selectedTimezone, setSelectedTimezone] = useState('')

    const { user } = useUser();
    const usMetadata = user?.unsafeMetadata;

    useEffect(() => {
        if (selectedTimezone !== "") {
            user?.update({
                unsafeMetadata: {
                    ...usMetadata,
                    timezone: selectedTimezone
                }
            })
        }
    }, [selectedTimezone]);

    return (
        <div className={`p-2 mt-2`} >
            <h1 className="text-xl font-semibold mb-2 text-white">Timezone</h1>
            <Select
                id="selectID"
                label={user?.unsafeMetadata.timezone ? user?.unsafeMetadata.timezone as string : "Select a time-zone"}
                name="tzselectname"
                value={selectedTimezone}
                onChange={e => setSelectedTimezone(e.target.value)}
                required
                size='lg'
            >
                {timezoneJSON.map((timezone) =>
                    <SelectItem key={timezone.text} value={timezone.text}>
                        {timezone.text}
                    </SelectItem>
                )}
            </Select>
        </div>
    )
}