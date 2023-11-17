export default function GameLayout({ children, params, }: { children: React.ReactNode, params: { id: string } }) {

    return (
        <>
            <div>{"In Layout! Game Id: " + params.id}</div>
            <div className="grow flex ">{children}</div>
        </>
    )

}