import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from "@clerk/nextjs";

export default function UserMenu() {
    return (
        <div className="md:hover:shadow-md p-4 md:p-8 mx-auto md:mx-0 text-white">
            <SignedIn>
                {/* Mount the UserButton component */}
                <UserButton
                    userProfileMode="navigation"
                    userProfileUrl="/user-profile/"
                    showName
                    appearance={{
                        elements: {
                            userButtonBox: "",
                            userButtonOuterIdentifier: "text-white font-mono "
                        }
                    }}
                />
            </SignedIn>
            <SignedOut>
                {/* Signed out users get sign in button */}
                <SignInButton />
            </SignedOut>
        </div>
    )
}




