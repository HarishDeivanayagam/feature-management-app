import React from "react";

function Button(props:any) {
    return(
        <button className={`${props.color?'bg-'+props.color+'-700':'bg-purple-700'} w-full p-2 text-center text-white rounded-md focus:outline-none hover:${props.color?'bg-'+props.color+'-600':'bg-purple-600'} transition-colors`} id={props.id} onClick={props.onClick} type={props.type}>{props.children}</button>
    )
}

export default Button;
