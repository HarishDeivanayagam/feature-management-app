import React from "react";
import NavBar from "./NavBar";

function AppContainer(props:any) {
    return (
        <div className="flex justify-start">
            <div className="fixed w-14 bg-purple-700 h-screen"><NavBar path={props.path}/></div>
            <div className="ml-16 mt-2 mb-2 mr-2 w-screen">{props.children}</div>
        </div>
    )
}

export default AppContainer;
