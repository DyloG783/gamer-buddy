"use client"

import Profile from "@/app/profile/page";
import { UserProfile } from "@clerk/nextjs";
import { Docs } from "@/app/icons"; // find a better icon

const UserProfilePage = () => (
    <UserProfile path="/user-profile" routing="path" >
        <UserProfile.Page label="Game Settings" labelIcon={<Docs />} url="/game-settings">
            <Profile />
        </UserProfile.Page>
    </UserProfile >

);

export default UserProfilePage;