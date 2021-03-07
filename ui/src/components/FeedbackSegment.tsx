import React from "react";

function FeedbackSegment(props:any) {


    const handleDragOver = (e:any) => {
        e.preventDefault();
    }

    return (
        <div className="inline-block ml-2 mr-2" onDragOver={handleDragOver} onDrop={(e:any)=>props.handleDrop(e, props.id)}>
            <p>{props.title}</p>
            <ul style={{ width:"350px", height:'88vh' }} className="p-2 mb-4 bg-purple-100 border-t-4 border-purple-800 border-solid overflow-x-hidden overflow-y-auto">
                {props.children}
            </ul>
        </div>
    )
}

export default FeedbackSegment;
