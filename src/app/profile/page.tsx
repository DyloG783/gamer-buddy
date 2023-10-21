import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
import AboutYou from "@/app/components/profile/AboutYou";
import Username from "@/app/components/profile/Username";
import { PrismaClient } from "@prisma/client";

export default function Profile() {

    // // client side session status check to redirect to log in not authed
    // const { data: session, status } = useSession()
    // const router = useRouter()
    // if (status === "unauthenticated") {
    //     router.push('/api/auth/signin')
    // }

    // session user variables
    // const authUserName = session?.user?.name as string
    // const authEmail = session?.user?.email as string



    return (
        <main className="flex justify-around text-sm md:text-base lg:text-lg">
            <div className="flex flex-col w-3/4 md:w-1/2">
                <Username />
                <AboutYou />
            </div>
        </main>
    );
};
