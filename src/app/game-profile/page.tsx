import TimezoneSelector from "./TimezoneSelector";
import AboutYouSelector from "./AboutYouSelector";

export default function Profile() {
    return (
        <div className="w-full shadow-md p-1 md:p-5">
            <AboutYouSelector />
            <TimezoneSelector />
        </div>
    );
};
