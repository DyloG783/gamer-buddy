import ConnectionUpdates from "@/app/components/ConnectionUpdates";
import ProfileStatus from "@/app/components/ProfileStatus";
import HeroContent from "./components/HeroContent";

export default async function Home() {
  return (
    <div id="home_page_container" className="h-full flex flex-col">
      <div id="hero_layout_container"
        className="p-4 shadow-md bg-gradient-to-tr from-sky-50 to-emerald-50"
      >
        <HeroContent />
      </div>

      <div
        id="connectoin_updates_layout_container"
        className="grow p-4 shadow-md bg-gradient-to-bl from-blue-100 to-sky-50"
      >
        <ConnectionUpdates />
      </div>

      <ProfileStatus />
    </div>
  );
}
