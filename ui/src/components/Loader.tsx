import React from "react";

function Loader() {
    return (
        <div className="fixed left-1/2 right-1/2 top-1/2 bottom-1/2 -translate-x-1/2 -translate-y-1/2 -mt-16">
            <p className="animate-pulse mb-2">Loading...</p>
            <div className="animate-spin h-16 w-16 rounded-full border-solid border-gray-200" style={{ borderWidth: "10px", borderTopColor: "#7A3CFF" }}></div>
        </div>
    )
}

export default Loader;