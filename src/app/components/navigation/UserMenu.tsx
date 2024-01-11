import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from "@clerk/nextjs";

export default function UserMenu() {
    return (
        <div className="md:hover:shadow-md p-4 md:p-8 font-semibold ">
            <SignedIn>
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
                <SignInButton />
            </SignedOut>
        </div>
    )
}




