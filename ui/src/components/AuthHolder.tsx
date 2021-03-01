import React from "react";

function AuthHolder(props: any) {
  return (
    <div className="flex justify-center" style={{ marginTop:"20vh" }}>
      <div className="border-gray-300 border-2 w-3/12 m-5 p-7 rounded-md shadow-md">{props.children}</div>
    </div>
  );
}

export default AuthHolder;
