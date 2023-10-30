"use client"

import { useState } from "react";
import TimezoneSelect from "react-timezone-select";
// import TimeZonePicker from "react-timezone";

export default function TimezoneSelector() {
    const [selectedTimezone, setSelectedTimezone] = useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    )

    return (
        <div className="">
            <h2>react-timezone-select</h2>
            <blockquote>Please make a selection</blockquote>
            <div className="select-wrapper">
                <TimezoneSelect
                    value={selectedTimezone}
                    onChange={() => setSelectedTimezone}
                />
            </div>
            <h3>Output:</h3>
            <div
                style={{
                    backgroundColor: '#ccc',
                    padding: '20px',
                    margin: '20px auto',
                    borderRadius: '5px',
                    maxWidth: '600px',
                }}
            >
                <pre
                    style={{
                        margin: '0 20px',
                        fontWeight: 500,
                        fontFamily: 'monospace',
                    }}
                >
                    {JSON.stringify(selectedTimezone, null, 2)}
                </pre>
            </div>
        </div>
    )
}