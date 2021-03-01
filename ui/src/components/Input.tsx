import React from "react";

const Input = React.forwardRef((props: any, ref: any) => (
  <div className="w-full">
    <input className={`w-full p-2 outline-none border-2 ${props.error?"border-red-600":"focus:ring-2 focus:ring-purple-700 border-gray-100"} rounded-md shadow-sm bg-gray-50`} ref={ref} name={props.name} id={props.id} type={props.type} placeholder={props.placeholder}/>
    {props.error?<p className="text-red-600">{props.error}</p>:null}
  </div>
));

export default Input;
