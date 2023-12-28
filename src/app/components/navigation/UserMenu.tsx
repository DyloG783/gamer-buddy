import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from "@clerk/nextjs";

export default function UserMenu() {
    return (
        <div className="p-7 hover:shadow-2xl">
            <SignedIn>
                {/* Mount the UserButton component */}
                <UserButton userProfileMode="navigation" userProfileUrl="/user-profile/" />
            </SignedIn>
            <SignedOut>
                {/* Signed out users get sign in button */}
                <SignInButton />
            </SignedOut>
        </div>
    )
}




