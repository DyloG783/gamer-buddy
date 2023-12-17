import ConnectionMessages from "@/app/components/ConnectionMessages";
import ProfileStatus from "@/app/components/ProfileStatus";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export default async function Home() {

  // const session = await getServerSession(authOptions)
  // console.log(JSON.stringify(session))

  return (
    <>
      <div id="home_page_container" className="grow flex justify-evenly flex-col p-2">
        <div id="title_info_section" className=" shadow-md flex flex-col items-center p-4 bg-slate-300">
          <h1 className="font-semibold text-center mb-4 text-blue-700 text-xl">Bringing Gamers Together</h1>
          <p className="max-w-4xl">
            Connect with others who enjoy the same games as you based on similar timezones. You can chat with others in a forum, or click on another player and connect with them privately, once you are connected our job here is done. Go and enjoy your game together on whatever platform or service works best for you!
          </p>
        </div>
        <ProfileStatus />
        <ConnectionMessages />
      </div>
    </>
  );
}
