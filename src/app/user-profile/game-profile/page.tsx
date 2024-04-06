import TimezoneSelector from "./components/TimezoneSelector";
import AboutYouSelector from "./components/AboutYouSelector";

export default function Profile() {
    return (
        <div className="flex flex-col gap-2 md:gap-10 p-1 md:p-5 dark:bg-violet-950/0">
            <TimezoneSelector />
            <AboutYouSelector />
        </div>
    );
};
