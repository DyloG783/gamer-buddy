import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from "@clerk/nextjs";

export default function UserMenu() {
    return (
        <div className="md:hover:shadow-sm p-4 md:p-8 font-semibold ">
            <SignedIn>
                {/* Mount the UserButton component */}
                <UserButton
                    userProfileMode="navigation"
                    userProfileUrl="/user-profile/"
                    showName
                    appearance={{
                        elements: {
                            userButtonBox: "",
                            userButtonOuterIdentifier: "md:text-xl"
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




