"use client"

import Profile from "@/app/game-profile/page";
import { UserProfile } from "@clerk/nextjs";
import { Docs } from "./icons"; // find a better icon

const UserProfilePage = () => (
    <div id="clerk_profile_container" className="flex justify-around">
        <UserProfile path="/user-profile" routing="path">
            <UserProfile.Page label="Game Settings" labelIcon={<Docs />} url="/game-settings">
                <Profile />
            </UserProfile.Page>
        </UserProfile >
    </div>
);

export default UserProfilePage;