import React from "react";

function FeedbackSegment(props:any) {
    return (
        <div>
            <p>segmentname</p>
            <div style={{ width:"350px", height:'85vh' }} className=" bg-purple-100 border-t-4 border-purple-800 border-solid">
                {props.children}
            </div>
        </div>
    )
}

export default FeedbackSegment;