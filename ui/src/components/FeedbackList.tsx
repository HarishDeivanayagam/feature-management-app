import FeedbackSegment from "./FeedbackSegment";

function FeedbackList() {
    return (
        <div className="overflow-x-scroll overflow-y-hidden whitespace-nowrap">
            <div className="inline-block ml-2 mr-2"><FeedbackSegment>asdf</FeedbackSegment></div>
            <div className="inline-block ml-2 mr-2"><FeedbackSegment>asdf</FeedbackSegment></div>
            <div className="inline-block ml-2 mr-2"><FeedbackSegment>asdf</FeedbackSegment></div>
            <div className="inline-block ml-2 mr-2"><FeedbackSegment>asfd</FeedbackSegment></div>
            <div className="inline-block ml-2 mr-2"><FeedbackSegment>adsf</FeedbackSegment></div>
        </div>
    )
}

export default FeedbackList;
