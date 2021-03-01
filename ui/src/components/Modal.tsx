import React from "react";

function Modal(props:any) {
    return <div className="flex justify-center"><div className="fixed w-2/12 p-4 shadow-lg z-10 transition-all" style={{ marginTop:"20vh" }}>{props.children}</div></div>
}

export default Modal