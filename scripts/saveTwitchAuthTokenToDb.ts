import prisma from '@/app/lib/db';
import getTwitchAuthToken from './helpers/getTwitchAuthToken'

async function saveTwitchAuthTokenToDb() { 

    const writeData = async (token: string) => {
        try {
            await prisma.twitchAuthToken.upsert({
                where: {
                    type: 'token',
                },
                update: {
                    twitchAuthToken: token,
                },
                create: {
                    type: 'token',
                    twitchAuthToken: token
                }
            })
            console.log("Successfully wrote to db", token)
        } catch (error) {
            console.log("Catch error writeData", error)
        }
    }

    const token = await getTwitchAuthToken()
    await writeData(token)
}

saveTwitchAuthTokenToDb()
