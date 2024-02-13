export default function About() {

    return (
        <div className="flex flex-col full-height-minus-nav 
        tracking-wide shadow-sm background-color dark:bg-black
        p-4">
            <div className="grow flex flex-col">
                <h1 className="flex justify-around text-3xl text-blue-700 mt-10 mb-6">About</h1>
                <p className="grow flex items-center justify-around px-10">This website is a portfolio project. I have noticed international traffic and want to be transparent about the usage of this.
                    You are welcome to use this if you wish. Just note that you are not going to find many players at this early stage!</p>
            </div>
            <hr />
            <div className="grow flex flex-col justify-around">
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