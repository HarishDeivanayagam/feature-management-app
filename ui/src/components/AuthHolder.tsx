import React from "react";

function AuthHolder(props: any) {
  return (
    <div className="flex justify-center items-center">
      <div className="border-gray-300 border-2 w-1/5 p-7 rounded-md shadow-md">{props.children}</div>
    </div>
  );
}

export default AuthHolder;
