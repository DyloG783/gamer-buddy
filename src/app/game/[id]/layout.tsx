export default function GameLayout({ children, params, }: { children: React.ReactNode, params: { id: string } }) {

    const gameId = params.id;

    return (
        <div className="grow flex flex-col justify-evenly">
            <div className="">{children}</div>
            <div>{`Game Connections section`}</div>
            <div>{`Game timezone matches section`}</div>
        </div>
    )

}