import React from "react";
import ThumbsupIcon from "./icons/ThumbsupIcon";

interface FeedbackProps {
    id: number;
    title: string;
    description: string;
    creator: string;
    creatorEmail: string;
    count: number;
    handleDragStart:any;
}

function Feedback(props:any) {


    const handleDragOver = (e:any) => {
        e.stopPropagation();
    }


    return (
        <div id={`${props.id}`} draggable={true} onDragOver={handleDragOver} onDragStart={e=>{props.handleDragStart(e, props.id)}} onClick={()=>{props.onSelect(props.id)}} className={`${props.selected?"border-4 border-green-700 border-solid":""} w-full mt-1 mb-3 bg-white h-full rounded-md shadow-sm p-3 cursor-move`}>
            <div className="flex justify-start">
                <div className="mr-4 mt-2 ml-2">
                    <ThumbsupIcon/>
                    <p className="text-xl">{props.count}</p>
                </div>
                <div>    
                    <h1 className="text-xl mb-2">{props.title}</h1>
                    <p className="text-sm mb-2">{props.creator} - {props.creatorEmail}</p>
                    <h2 className="text-base mb-2 text-justify">{props.description}</h2>
                    <button className="pt-1 pb-1 pl-2 pr-2 bg-purple-800 text-white rounded-md hover:bg-purple-700 focus:outline-none transition-colors">Expand</button>
                </div>
            </div>
        </div>
    )
}

export default Feedback;
