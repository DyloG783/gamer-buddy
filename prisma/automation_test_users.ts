export const automation_users = [
    { // this user is permanent and needs to be synced with Clerk. Id below is not used
        id: "auto1",
        email: "automation1@gbtestpermanent.com",
        userName: "auto1",
        games: [83563, 111258],
        bio: "I'm available to play in other timezones too!",
        timezone: "(UTC-12:00) International Date Line West"
    },
    {
        id: "auto2",
        email: "automation2@gbtest.com",
        userName: "auto2",
        games: [83563, 111258, 116090],
        bio: "I have limited availability so can only play a few hours a night in my tz",
        timezone: "(UTC-12:00) International Date Line West"
    },
    {
        id: "auto3",
        email: "automation3@gbtest.com",
        userName: "auto3",
        bio: "Just looking around...",
        timezone: "(UTC+02:00) Beirut"
    },
    {
        id: "auto4",
        email: "automation4@gbtest.com",
        userName: "auto4",
        games: [83563, 111258, 116090],
        bio: "Down for whatever hit me up. Pretty cas",
        timezone: "(UTC+10:00) Canberra, Melbourne, Sydney"
    },

]