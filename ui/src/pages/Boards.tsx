import React from "react";
import AppContainer from "../components/AppContainer";
import HorizontalList from "../components/HorizontalList";
import FeedbackSegment from "../components/FeedbackSegment";
import { useAtom } from "jotai";
import segmentAtom, { initialSegmentState } from "../data/segmentData";
import axios from "axios";
import { API_URL } from "../config";
import { getToken } from "../metal/auth";
import feedbackAtom, { initialFeedbackState } from "../data/feedbackData";
import Feedback from "../components/Feedback";

function Boards() {

    const [segmentData, setSegmentData] = useAtom(segmentAtom);
    const [feedbackData, setFeedbackData] = useAtom(feedbackAtom);
    const [feedbackLoading, setFeedbackLoading] = React.useState<boolean>(true);
    const [segmentLoading, setSegmentLoading] = React.useState<boolean>(true);
    let felmGroup = new Map();


    const getGroupCount = (gid:number) => {
        if(gid !== null) {
            if(felmGroup.get(gid) === undefined) {
                felmGroup.set(gid, 0);
            } else {
                let curr = felmGroup.get(gid);
                felmGroup.set(gid, curr += 1);
            }
            return felmGroup.get(gid);
        } else {
            return 0;
        }
    }


    const getAllSegments = async () => {
        if(segmentData===initialSegmentState) {
            try {
                let res = await axios.get(`${API_URL}/segments`, { headers: getToken() });
                setSegmentData(res.data);
                setSegmentLoading(false);
            } catch(err) {
                console.log(err)
            }
        } else {
            setSegmentLoading(false);
        }

    }

    const getAllFeedback = async () => {
        if(feedbackData===initialFeedbackState) {
            try {
                let res = await axios.get(`${API_URL}/feedback`, { headers: getToken() });
                setFeedbackData(res.data);
                setFeedbackLoading(false);
            } catch(err) {
                console.log(err)
            }
        } else {
            setFeedbackLoading(false);
        }
    }

    React.useEffect(()=>{
        getAllFeedback();
        getAllSegments();
    },[])

    return (
        <AppContainer path="/boards">
            <h1 className="ml-2 text-lg mb-2">Boards</h1>
            {feedbackLoading===false && segmentLoading === false ?
            <HorizontalList>

                <FeedbackSegment title="Unsegmented">
                    {feedbackData!==initialFeedbackState?feedbackData.map((felm:any, findex:number)=>{
                        if(felm.segment === null) {
                            return <div key={findex}><Feedback title={felm.feedback} description={felm.description} count={getGroupCount(felm.group)} creator={felm.creatorName} creatorEmail={felm.creatorEmail}/></div>
                        }
                    }):null}
                </FeedbackSegment>
                {segmentData!==initialSegmentState?
                    segmentData.map((selm:any, sindex:number)=> {
                        return (
                            <FeedbackSegment key={sindex} title={selm.name}>
                            {
                            feedbackData.map((felm:any, findex:number)=>{
                                if(felm.segment===selm.id) {
                                    return <div key={findex}><Feedback title={felm.feedback} count={getGroupCount(felm.group)} description={felm.description} creator={felm.creatorName} creatorEmail={felm.creatorEmail}/></div>
                                }
                            })
                        }</FeedbackSegment>)
                    })
                :null}
            </HorizontalList>:<div>Loading...</div>}
        </AppContainer>
    )
}

export default Boards;
