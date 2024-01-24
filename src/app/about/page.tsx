export default function About() {

    return (
        <div className="grid grid-flow-row auto-rows-fr tracking-wide ">
            <div className="">
                <h1 className="flex justify-around text-3xl text-blue-700 mt-10 mb-6">About</h1>
                <p className="flex justify-around p-4 mb-0 italic">This website is a portfolio project. I have noticed international traffic and want to be transparent about the usage of this</p>
                <hr className="my-10" />
            </div>

            <div className="">
                <div className="p-10">
                    <p className="">For now I&apos;m not planning to market, or bring people to this website as I am on a free, and limited database plan. The value to users depends on the amount of users actively interacting with others. That&apos;s not going to happen for quite some time! However you are welcome to use this if you wish. Just note that you are not going to find many players at this early stage.</p>
                </div>

                <hr className="my-10" />
            </div>

            <div className="flex flex-col justify-around">
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