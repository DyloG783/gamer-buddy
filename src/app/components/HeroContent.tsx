export default function HeroContent() {

    return (
        <div id="hero_container">
            <h1 className="font-bold text-center mt-6 md:mt-12 mb-10 md:mb-14 text-blue-900 text-xl md:text-4xl tracking-wide">Bringing Gamers Together</h1>
            <div className="grid grid-flow-row auto-rows-fr gap-4 md:gap-14 max-w-5xl mx-auto ">
                <div className="grid grid-flow-col auto-cols-fr shadow-sm p-8">
                    <p className="m-auto tracking-wider">
                        Find others through your favorite games
                    </p>
                    <img src="/./category.svg" height={0} width={0} alt="chat_icon"
                        className="w-8 md:w-10 lg:w-12 h-auto m-auto "
                    />
                </div>

                <div className="grid grid-flow-col auto-cols-fr shadow-sm p-8">
                    <img src="/./rank.svg" height={0} width={0} alt="chat_icon"
                        className="w-8 md:w-10 lg:w-12 h-auto m-auto"
                    />
                    <p className="m-auto tracking-wider">
                        Chat in open forums per game
                    </p>
                </div>


                <div className="grid grid-flow-col auto-cols-fr p-8">
                    <p className="m-auto tracking-wider">
                        Create connections and chat with people 1-1
                    </p>
                    <img src="/./comments-question.svg" height={0} width={0} alt="chat_icon"
                        className="w-8 md:w-10 lg:w-12 h-auto m-auto"
                    />
                </div>
                {/* <p className="m-auto italic p-4 tracking-wide">Once your chatting, or job here is done. Go and play on whatever platform works for you!</p> */}
            </div>


        </div>
    )
}