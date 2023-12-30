import ConnectionUpdates from "@/app/components/ConnectionUpdates";
import ProfileStatus from "@/app/components/ProfileStatus";
import HeroContent from "./components/HeroContent";

export default async function Home() {
  return (
    <div id="home_page_container" className="h-full flex flex-col">
      <div id="hero_layout_container" className="p-4 bg-slate-300 ">
        <HeroContent />
      </div>

      <div
        id="connectoin_updates_layout_container"
        className="grow p-4 bg-slate-200 "
      >
        <ConnectionUpdates />
      </div>

      <ProfileStatus />
    </div>
  );
}
