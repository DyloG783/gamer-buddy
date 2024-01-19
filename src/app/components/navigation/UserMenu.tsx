import Loading from "@/lib/loading";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from "@clerk/nextjs";

export default async function UserMenu() {
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




