import Link from "next/link";

export default function About() {

    return (
        <div className="flex flex-col full-height-minus-nav 
        tracking-wide shadow-sm background-color dark:bg-black
        p-4">
            <div className="flex flex-col px-10 ">
                <h1 className="flex justify-around text-3xl text-blue-700 mt-10 mb-6">About</h1>
                <p>To users
                </p>
                <br />
                <p>This website is a portfolio project. I have noticed international traffic and want to be transparent about the usage of this.
                    You are welcome to use this if you wish. Just note that you are not going to find many players at this early stage!
                </p>
                <br />
                <br />
                <br />
                <p>To recruiters and potential employers</p>
                <br />
                <p>
                    Please note to see the core functoinality of this application you really need to create an account. This will give you access to see real time chat functionality and more.
                    Otherwise you can only search and view games.
                </p>
                <br />
                <p>This app uses <Link href="https://clerk.com/" target="_blank" className="primary-color-font underline">Clerk Auth</Link> for authentication which is very safe so don't be worried about signing up and trying things out!</p>
                <br />
                <br />
            </div>
            <hr />
            <div className="grow flex flex-col justify-around px-10">
                <p className="mx-auto">
                    Built on
                    <span className="primary-color-font"> NextJS </span> with
                    <span className="primary-color-font"> React</span>,
                    <span className="primary-color-font"> Tailwind</span>,
                    <span className="primary-color-font"> Prisma</span>,
                    <span className="primary-color-font"> Pusher</span>, and
                    <span className="primary-color-font"> Clerk auth</span>. Testing with
                    <span className="primary-color-font"> Playwright </span> &
                    <span className="primary-color-font"> Jest </span>
                </p>
            </div>
        </div>
    )
}