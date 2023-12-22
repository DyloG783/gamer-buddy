import { useUser } from "@clerk/nextjs";
import TimezoneSelector from "./timezone/TimezoneSelector";
import AboutYouSelector from "./about_you/AboutYouSelector";

export default function Profile() {

    return (
        <div className="w-full shadow-md p-1 md:p-5">
            <AboutYouSelector />
            <TimezoneSelector />
        </div>
    );
};
