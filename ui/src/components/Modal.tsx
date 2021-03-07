import React from "react";

function Modal(props:any) {
    return <div className="flex justify-center"><div className={`fixed w-2/12 p-4 shadow-2xl z-10 bg-white opacity-100 rounded-sm`} style={{ marginTop:"20vh" }}>{props.children}</div></div>
}

export default Modal