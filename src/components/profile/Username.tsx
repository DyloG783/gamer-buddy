import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { PrismaClient } from '@prisma/client';

export default function Username() {

    const { data: session } = useSession()
    const userName = session?.user?.name as string

    const [editing, setEditing] = useState(false);
    const startEdit = () => {
        setEditing(true)
    }
    const endEdit = () => {
        setEditing(false)
    }

    const submitEdit = () => {

    }

    const prisma = new PrismaClient()

    async function main() {
        const allUsers = await prisma.user.findMany()
        console.log(allUsers)
    }

    main()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })

    return (
        <div className="flex flex-col p-2 text-sm md:text-base lg:text-lg">
            <label htmlFor="username" className="italic font-bold">Username</label>
            <div className={`${editing ? 'hidden' : ''} flex justify-between `}>
                <label className={`px-2 `}>{userName}</label>
                <Image src="./edit_icon.svg" onClick={startEdit} height={0} width={0} alt="Edit button" className={`w-4 md:w-7 ${editing ? 'hidden' : ''}`} />
            </div>
            <div className={`${editing ? '' : 'hidden'} flex justify-between`}>
                <input type="text" name="username" placeholder={userName} className={`border-cyan-700 border-2 `} />
                <Image src="./checkmark-icon.svg" onClick={endEdit} height={0} width={0} alt="Submit button" className={`w-4 md:w-7 ${editing ? '' : 'hidden'}`} />
            </div>
        </div>
    )
}