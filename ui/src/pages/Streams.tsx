import { useAtom } from "jotai";
import React from "react";
import AppContainer from "../components/AppContainer";
import accountAtom from "../data/accountData";

function Streams() {

    const [accountData,] = useAtom(accountAtom);

    return (
        <AppContainer path="/streams">
            <h1 className="text-xl">Streams</h1>
            <div className="mt-2 rounded-md h-full w-full bg-gray-200 border-t-4 border-solid border-gray-800 p-4">
                <h1 className="text-lg mb-2">External API</h1>
                <p className="text-lg mb-2">Api Defenition</p>
                <p>Link*: http://localhost:8080/api/feedback</p>
                <span>Body*: </span><pre>{`{ 
    title: string, 
    description: string, 
    creatorName: string, 
    creatorEmail: string, 
    tenant: ${accountData.tenant}
}`}</pre>
                <p className="text-red-900 mt-2">Note: The creator's email and name could be set through your authentication keys.</p>
            </div>
        </AppContainer>
    )
}

export default Streams;
