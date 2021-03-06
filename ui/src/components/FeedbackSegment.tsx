import React from "react";

function FeedbackSegment(props:any) {
    return (
        <div className="inline-block ml-2 mr-2">
            <p>{props.title}</p>
            <div style={{ width:"350px", height:'88vh' }} className="p-2 mb-4 bg-purple-100 border-t-4 border-purple-800 border-solid">
                {props.children}
            </div>
        </div>
    )
}

export default FeedbackSegment;
