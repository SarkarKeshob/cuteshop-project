import ReactDOM from "react-dom";
const Loading = () => {
    return ReactDOM.createPortal(
        <div className="bg-slate-600 min-h-screen bg-opacity-60 absolute top-0 left-0 right-0 bottom-0 z-50">
            <div className="w-1/5 mx-auto mt-32">
                <div className="loading loading-spinner loading-lg text-warning w-full"></div>

            </div>
        </div>, document.getElementById("loader")

    );
};

export default Loading;