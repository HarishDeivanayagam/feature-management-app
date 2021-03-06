import React from "react";

function FeedbackList(props:any) {
    return (
        <div className="flex overflow-x-auto overflow-y-hidden">
            {props.children}
        </div>
    )
}

export default FeedbackList;
