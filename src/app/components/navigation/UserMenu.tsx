import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from "@clerk/nextjs";

export default function UserMenu() {
    return (
        <div className="md:hover:shadow-md p-4 md:p-8  ">
            <SignedIn>
                <UserButton
                    userProfileMode="navigation"
                    userProfileUrl="/user-profile/"
                    showName
                    appearance={{
                        elements: {
                            userButtonBox: "",
                            userButtonOuterIdentifier: "md:text-lg font-semibold"
                        }
                    }}
                />
            </SignedIn>
            <SignedOut>
                <SignInButton />
            </SignedOut>
        </div>
    )
}




