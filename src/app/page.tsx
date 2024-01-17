import ConnectionUpdates from "@/app/components/ConnectionUpdates";
import ProfileStatus from "@/app/components/ProfileStatus";
import HeroContent from "./components/HeroContent";
import { Suspense } from 'react';
import Loading from "@/lib/loading";

// 30 seconds auto update for all clients
export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <div id="home_page_container" className="h-full flex flex-col">
      <div id="hero_layout_container"
        className="p-4 shadow-sm"
      >
        <HeroContent />
      </div>

      <div
        id="connectoin_updates_layout_container"
        className=" grow p-4 shadow-md"
      >
        <Suspense fallback={<Loading />}>
          <ConnectionUpdates />
        </Suspense>
      </div>
      <ProfileStatus />
    </div>
  );
}
