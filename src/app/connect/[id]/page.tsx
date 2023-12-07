

export default async function Connect({ params }: { params: { id: number } }) {

    const gameId = Number(params.id) // this id passed in params is the game's id

    return (
        <div>Connect</div>
    )

}