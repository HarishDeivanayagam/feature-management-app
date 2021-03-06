import React from "react";
import AppContainer from "../components/AppContainer";
import FeedbackList from "../components/FeedbackList";
import FeedbackSegment from "../components/FeedbackSegment";

function Boards() {
    return (
        <AppContainer path="/boards">
            <h1 className="ml-2 text-lg mb-2">Boards</h1>
            <FeedbackList/>
        </AppContainer>
    )
}

export default Boards;
