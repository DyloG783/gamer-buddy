export default function HeroContent() {

    return (
        <div id="hero_container">
            <h1 className="font-bold text-center mt-6 md:mt-12 mb-10 md:mb-14 blue-font text-xl md:text-4xl tracking-wide">
                Bringing Gamers Together
            </h1>
            {/* <div className="grid grid-flow-row auto-rows-fr gap-4 md:gap-14 max-w-5xl mx-auto "> */}
            <div className="grid grid-flow-row  gap-4 md:gap-14 max-w-5xl mx-auto ">
                <div className="grid grid-flow-col auto-cols-fr p-8 ">
                    <p className="m-auto tracking-wider">
                        Find others through your favorite games
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"
                        className={`w-8 md:w-10 lg:w-12 h-auto m-auto dark:fill-white`}
                    >
                        <path d="m0,2.5v7.5h10V0H2.5C1.122,0,0,1.122,0,2.5Zm9,6.5H1V2.5c0-.827.673-1.5,1.5-1.5h6.5v8Zm13-6.5c0-1.378-1.122-2.5-2.5-2.5h-7.5v10h10V2.5Zm-1,6.5h-8V1h6.5c.827,0,1.5.673,1.5,1.5v6.5ZM0,19.5c0,1.378,1.122,2.5,2.5,2.5h7.5v-10H0v7.5Zm1-6.5h8v8H2.5c-.827,0-1.5-.673-1.5-1.5v-6.5Zm22.605,9.898l-3.605-3.605c.616-.77,1-1.733,1-2.793,0-2.481-2.019-4.5-4.5-4.5s-4.5,2.019-4.5,4.5,2.019,4.5,4.5,4.5c1.06,0,2.023-.384,2.793-1l3.605,3.605.707-.707Zm-7.105-2.898c-1.93,0-3.5-1.57-3.5-3.5s1.57-3.5,3.5-3.5,3.5,1.57,3.5,3.5-1.57,3.5-3.5,3.5Z" />
                    </svg>
                </div>
                <hr />
                {/* <div className="grid grid-flow-col auto-cols-fr p-8 shadow-sm dark:shadow-white"> */}
                <div className="grid grid-flow-col auto-cols-fr p-8 ">
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"
                        className={`w-8 md:w-10 lg:w-12 h-auto m-auto dark:fill-white`}>
                        <path d="m21,10c1.103,0,2-.897,2-2s-.897-2-2-2-2,.897-2,2,.897,2,2,2Zm0-3c.552,0,1,.449,1,1s-.448,1-1,1-1-.449-1-1,.448-1,1-1Zm-2.989,6.398c.287-1.39,1.545-2.398,2.989-2.398s2.702,1.009,2.989,2.398c.057.271-.219.545-.489.602-.231,0-.44-.163-.489-.398-.192-.928-1.038-1.602-2.011-1.602s-1.818.673-2.011,1.602c-.056.271-.324.442-.591.388-.271-.056-.444-.321-.388-.591Zm-6.011-9.398c1.103,0,2-.897,2-2s-.897-2-2-2-2,.897-2,2,.897,2,2,2Zm0-3c.551,0,1,.449,1,1s-.449,1-1,1-1-.449-1-1,.449-1,1-1Zm11.5,13c.034,0-.034.007,0,0h0Zm-9-6c.034,0-.034.007,0,0h0Zm-9,4c.034,0-.034.007,0,0h0Zm15.5,4h-2.5c-.768,0-1.469.29-2,.766v-3.766c0-1.654-1.346-3-3-3h-3c-1.654,0-3,1.346-3,3v1.766c-.531-.476-1.232-.766-2-.766h-2.5c-1.654,0-3,1.346-3,3v4c0,1.654,1.346,3,3,3h18c1.654,0,3-1.346,3-3v-2c0-1.654-1.346-3-3-3Zm-13.5,7H3c-1.103,0-2-.897-2-2v-4c0-1.103.897-2,2-2h2.5c1.103,0,2,.897,2,2v6Zm8,0h-7v-10c0-1.103.897-2,2-2h3c1.103,0,2,.897,2,2v10Zm7.5-2c0,1.103-.897,2-2,2h-4.5v-4c0-1.103.897-2,2-2h2.5c1.103,0,2,.897,2,2v2ZM.01,11.398c.288-1.39,1.545-2.398,2.99-2.398s2.702,1.009,2.99,2.398c.056.271-.22.545-.49.602-.232,0-.441-.163-.49-.398-.192-.928-1.038-1.602-2.01-1.602s-1.818.673-2.01,1.602c-.056.27-.322.442-.591.388-.27-.056-.444-.321-.388-.591Zm2.99-3.398c1.103,0,2-.897,2-2s-.897-2-2-2-2,.897-2,2,.897,2,2,2Zm0-3c.551,0,1,.449,1,1s-.449,1-1,1-1-.449-1-1,.449-1,1-1Zm6.01,2.398c.288-1.39,1.545-2.398,2.99-2.398s2.702,1.009,2.989,2.398c.057.271-.219.545-.489.602-.231,0-.44-.163-.489-.398-.192-.928-1.038-1.602-2.011-1.602s-1.818.673-2.01,1.602c-.057.27-.326.442-.591.388-.27-.056-.444-.321-.388-.591Z" />
                    </svg>

                    <p className="m-auto tracking-wider">
                        Chat in open forums per game
                    </p>
                </div>
                <hr />
                {/* <div className="grid grid-flow-col auto-cols-fr p-8 mb-10 shadow-sm dark:shadow-white"> */}
                <div className="grid grid-flow-col auto-cols-fr p-8 mb-10">

                    <p className="m-auto tracking-wider">
                        Create connections and chat with people 1-1
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"
                        className='w-8 md:w-10 lg:w-12 h-auto m-auto dark:fill-white'>
                        <path d="M8.685,18H3.5c-2.29,0-3.5-1.21-3.5-3.5v-5.188C0,4.597,3.823,.343,8.348,.022c2.602-.178,5.161,.77,7.007,2.614,1.852,1.853,2.808,4.417,2.623,7.037-.319,4.514-4.575,8.326-9.293,8.326Zm.3-17c-.188,0-.377,.007-.566,.021C4.397,1.305,1,5.102,1,9.312v5.188c0,1.729,.771,2.5,2.5,2.5h5.185c4.213,0,8.012-3.388,8.295-7.396,.165-2.331-.686-4.612-2.332-6.26-1.507-1.506-3.545-2.344-5.663-2.344Zm15.016,20.001v-4.726c0-2.698-1.424-5.354-3.717-6.93-.228-.155-.538-.098-.695,.129-.156,.228-.099,.539,.129,.695,2.025,1.393,3.283,3.731,3.283,6.105v4.726c0,1.652-1.088,1.999-2,1.999h-4.722c-2.374,0-4.714-1.258-6.107-3.283-.157-.229-.467-.285-.695-.129-.228,.156-.285,.468-.129,.695,1.578,2.293,4.233,3.717,6.932,3.717h4.722c1.851,0,3-1.149,3-2.999ZM9.5,10.75c0-.454,.23-.727,.947-1.121,1.125-.621,1.729-1.895,1.506-3.168-.212-1.21-1.205-2.202-2.413-2.413-1.627-.287-3.208,.771-3.53,2.353-.055,.271,.12,.534,.391,.59,.272,.054,.535-.119,.59-.391,.214-1.057,1.276-1.758,2.377-1.567,.802,.141,1.459,.799,1.6,1.602,.152,.867-.242,1.699-1.003,2.119-.511,.282-1.464,.806-1.464,1.997,0,.276,.224,.5,.5,.5s.5-.224,.5-.5Zm-.5,2.25c-.552,0-1,.448-1,1s.448,1,1,1,1-.448,1-1-.448-1-1-1Z" />
                    </svg>
                </div>
                <hr />
            </div>
        </div>
    )
}