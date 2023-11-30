import prisma from "@/lib/db";
import ConnectionMessages from "@/app/components/ConnectionMessages";
import PaginatedGames from "@/app/games/components/PaginatedGames";
import ProfileStatus from "@/app/components/ProfileStatus";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";


export default async function Home() {


  return (
    <>
      <div id="home_page_container" className="grow flex justify-between flex-col p-2">
        <div id="title_info_section" className=" shadow-sm flex flex-col items-center">
          <h1 className="font-bold text-center p-2">Bringing Gamers Together</h1>
          <p className="max-w-4xl pb-4">
            Connect with others who enjoy the same games as you based on similar timezones. You can chat with others in a forum, or click on another player and connect with them privately, once you are connected our job here is done. Go and enjoy your game together on whatever platform or service works best for you!
          </p>
        </div>
        <ProfileStatus />
        <ConnectionMessages />
      </div>
    </>
  );
}
