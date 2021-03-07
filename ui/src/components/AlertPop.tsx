import React from "react";

const getColor = (val:string) => {
    if(val==="info") {
        return "yellow"
    }
    if(val==="success") {
        return "green";
    }
    if(val==="error") {
        return "red"
    }
}

const AlertPop = ({ style, options, message, close}:any) => (
    <div className={`bg-${getColor(options.type)}-100 border-l-4 border-solid border-${getColor(options.type)}-700 rounded-md shadow-sm p-4 mb-4 mr-4`}>
        <h1 className="text-base">{options.type}: {message}</h1>
    </div>
  )
  

export default AlertPop;