
interface IHideOrShowButtonProps {
    hideOrShowClickHandler: React.MouseEventHandler<HTMLButtonElement>,
    hiddenOrOpen: boolean
}

const HideOrShowButton: React.FC<IHideOrShowButtonProps> = ({ hideOrShowClickHandler, hiddenOrOpen }) => {

    return (
        <button onClick={hideOrShowClickHandler} className="  p-2 hover:bg-slate-400">
            <svg
                className={`w-3 md:w-4 lg:w-5
                            ${hiddenOrOpen ? "" : "hidden"}`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>
            <svg className={`w-3 md:w-4 lg:w-5 
                             ${hiddenOrOpen ? "hidden" : ""}`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
        </button>
    )
}

export default HideOrShowButton