import ConnectionUpdates from "@/app/components/ConnectionUpdates";
import ProfileStatus from "@/app/components/ProfileStatus";
import HeroContent from "./components/HeroContent";
import { Suspense } from 'react';
import Loading from "@/lib/loading";

// 30 seconds auto update for all clients
export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <div id="home_page_container" className="flex flex-col full-height-minus-nav 
    shadow-sm background-color dark:bg-black"
    >
      <Suspense fallback={<Loading />}>
        <ProfileStatus />
        {/* <Loading /> */}
      </Suspense>
      <div id="hero_layout_container"
        className="p-4"
      >
        <HeroContent />
      </div>

      <div
        id="connectoin_updates_layout_container"
        className="flex grow items-center justify-around p-4 my-4 md:p-0 md:my-0"
      >
        <Suspense fallback={<Loading />}>
          <ConnectionUpdates />
          {/* <Loading /> */}
        </Suspense>
      </div>

    </div>
  );
}
