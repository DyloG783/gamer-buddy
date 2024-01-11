import ConnectionUpdates from "@/app/components/ConnectionUpdates";
import ProfileStatus from "@/app/components/ProfileStatus";
import HeroContent from "./components/HeroContent";
import { Suspense } from 'react'

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
        <Suspense fallback={<p>Loading connections...</p>}>
          <ConnectionUpdates />
        </Suspense>
      </div>
      <Suspense fallback={<p>Loading profile status...</p>}>
        <ProfileStatus />
      </Suspense>

    </div>
  );
}
