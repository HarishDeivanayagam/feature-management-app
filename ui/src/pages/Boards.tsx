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
import { useAlert } from "react-alert";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { getError } from "../components/ErrorHelper";
import Loader from "../components/Loader";

interface INewSegment {
    name:string;
}


function Boards() {

    const [segmentData, setSegmentData] = useAtom(segmentAtom);
    const [feedbackData, setFeedbackData] = useAtom(feedbackAtom);
    const [feedbackLoading, setFeedbackLoading] = React.useState<boolean>(true);
    const [segmentLoading, setSegmentLoading] = React.useState<boolean>(true);
    const alert = useAlert();
    const [open, setOpen] = React.useState<boolean>(false);
    const {register, errors, handleSubmit} = useForm<INewSegment>();
    const [exdOpen, exdSetOpen] = React.useState<boolean>(false);
    const [marked, setMarked] = React.useState<boolean>(false);
    const [markedMap, setMarkedMap] = React.useState<Array<any>>([]);

    const handleDrop = async (e:any, sid:any) => {
        let temp:any = [];
        let old = [...feedbackData];
        try {
            e.preventDefault();
            const feedbackID = e.dataTransfer.getData("feedback_id");

            feedbackData.forEach((elm:any, index:number)=>{
                let telm = {...elm};
                if(elm.id == feedbackID) {
                    telm.segment = sid
                }
                temp.push(telm);
            })
            setFeedbackData(temp);
            await axios.put(`${API_URL}/feedback/segment`, { feedback: feedbackID, segment: sid } , {headers: getToken()});
            alert.success("Segments updated");
        } catch(err) {
            setFeedbackData(old);
            console.log(err)
            alert.error("Unable to update segments");
        }
    }

    const handleDragStart = (e:any, id:number) => {
        e.dataTransfer.setData('feedback_id', id);
        // setTimeout(()=>{
        //     e.target.style.display = "none";
        // },0)
    }


    const countSame = (arr:Array<any>, key:number) => {
        let count = 0;
        arr.forEach((elm:any, index:any)=>{
            if(elm.group === key) {
                count++;
            }
        })
        return count;
    }

    const createNewSegment = async (data:INewSegment) => {
        try {
            let res = await axios.post(`${API_URL}/segments`, data, {headers: getToken()});
            let temp = [...segmentData];
            temp.push(res.data);
            setSegmentData(temp);
            alert.success("New Segment Added");
            setOpen(false);
        } catch(err) {
            console.log(err);
            alert.error("Unable to create segment")
        }
    }


    const getAllSegments = async (force:boolean=false) => {
        if(segmentData===initialSegmentState || force===true) {
            try {
                let res = await axios.get(`${API_URL}/segments`, { headers: getToken() });
                setSegmentData(res.data);
                setSegmentLoading(false);
                alert.success("Segments loaded");
            } catch(err) {
                console.log(err)
                alert.error("Unable to fetch segments");
            }
        } else {
            setSegmentLoading(false);
            alert.success("Segments loaded");
        }
    }

    const onSelectFeedback = (fid:number) => {
        let temp:Array<any> = [];
        feedbackData.forEach((elm:any, index:number)=>{
            let t = {...elm};
            if(elm.id == fid) {
                if(t['selected']) {
                    t['selected'] = false;
                } else {
                    t['selected'] = true;
                }
            }
            temp.push(t);
        })
        setFeedbackData(temp);
        setMarked(true);
        let tmp = [...markedMap];
        tmp.push(fid);
        setMarkedMap(tmp);
        let t:any = [];
        
    }

    const clearMarked = () => {
        let temp:Array<any> = [];
        feedbackData.forEach((elm:any, index:number)=>{
            let t = {...elm};
            t['selected'] = false;
            temp.push(t);
        })
        setFeedbackData(temp);
        setMarked(false);
        setMarkedMap([]); 
    }

    const groupMarked = () => {
        console.log(markedMap);
    }


    const getAllFeedback = async (force:boolean=false) => {
        if(feedbackData===initialFeedbackState || force===true) {
            try {
                // Fetching data from api
                let res = await axios.get(`${API_URL}/feedback`, { headers: getToken() });

                // Create an map to store the groupid of duplicate feedback
                let gmap = new Map();

                let newTemp:Array<any> = [];

                res.data.forEach((elm:any, index:number)=>{

                    // If grouped then count else set count to zero
                    if(elm.group) {

                        // If group id doesn't exist on gmap then set count to feedback
                        if(gmap.get(elm.group) === undefined) {
                            let t = {...elm};

                            // Find the number of duplicates
                            t['count'] = countSame(res.data, elm['group']);
                            newTemp.push(t);
                            gmap.set(elm.group, true);
                        }
                    } else {
                        let t = {...elm};
                        t['count'] = 0;
                        newTemp.push(t);
                    }
                });
                setFeedbackData(newTemp);
                setFeedbackLoading(false);
                alert.success("Feedback loaded");
            } catch(err) {
                console.log(err)
                alert.error("Unable to fetch Feedback");
            }
        } else {
            setFeedbackLoading(false);
            alert.success("Feedback loaded");
        }
    }

    React.useEffect(()=>{
        getAllFeedback();
        getAllSegments();
        
    },[])



    return (
        <AppContainer path="/boards">
            {open?<Modal>
                <form name="create-segment-form" onSubmit={handleSubmit(createNewSegment)}>
                    <p className="text-right text-red-700 cursor-pointer" onClick={()=>{setOpen(false)}}>Close</p>
                    <label htmlFor="segment-name-input" id="addsegment-name-label">Name</label>
                    <Input name="name" id="segment-name-input" ref={register({ required:true, maxLength:20})} type="text" placeholder="Enter Segment Name" error={errors.name?getError(errors.name.type):null}/>
                    <br/>
                    <Button id="addsegment-button" type="submit">Create Segment</Button>
                </form>
            </Modal>:null}

            {exdOpen?<Modal>
                
            </Modal>:null}
            <div className="flex justify-between">
                <div><h1 className="ml-2 text-2xl mb-2">Boards</h1></div>
                <div>
                    {marked?<div className="flex justify-start">
                        <div className="mr-2"><Button onClick={groupMarked}>Group Marked</Button></div>
                        <div><Button onClick={clearMarked}>Clear Marked</Button></div>
                    </div>:null}
                </div>
            </div>
            
            {feedbackLoading===false && segmentLoading === false ?
            <HorizontalList>
                <FeedbackSegment id={null} title="Unsegmented" handleDrop={handleDrop}>
                    {feedbackData!==initialFeedbackState?feedbackData.map((felm:any, findex:number)=>{
                        if(felm.segment === null) {
                            return <li key={findex}><Feedback id={felm.id} selected={felm.selected} onSelect={onSelectFeedback} title={felm.feedback} description={felm.description} count={felm.count} creator={felm.creatorName} creatorEmail={felm.creatorEmail} handleDragStart={handleDragStart}/></li>
                        }
                    }):null}
                </FeedbackSegment>
                {segmentData!==initialSegmentState?
                    segmentData.map((selm:any, sindex:number)=> {
                        return (
                            <FeedbackSegment id={selm.id} key={sindex} title={selm.name} handleDrop={handleDrop}>
                            {
                            feedbackData.map((felm:any, findex:number)=>{
                                if(felm.segment===selm.id) {
                                    return <li key={findex}><Feedback id={felm.id} selected={felm.selected} onSelect={onSelectFeedback} title={felm.feedback} count={felm.count} description={felm.description} creator={felm.creatorName} creatorEmail={felm.creatorEmail} handleDragStart={handleDragStart}/></li>
                                }
                            })
                        }</FeedbackSegment>)
                    })
                :null}
                <div className="inline-block ml-2 mr-2">
                    <p>Create New</p>
                    <div style={{ width:"350px", height:'88vh' }} className="opacity-60 p-2 mb-4 bg-purple-100 border-2 border-dashed border-purple-800 text-center">
                        <button className="text-4xl mt-80 pl-4 pr-4 pt-1 pb-2 rounded-full bg-gray-900 text-white hover:bg-gray-600 transition-colors focus:outline-none" onClick={()=>{setOpen(true)}}>+</button>
                    </div>
                </div>            
                </HorizontalList>:<Loader/>}
        </AppContainer>
    )
}

export default Boards;
