import { Button, FormControl, Grid, MenuItem, Select } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import axios from "axios";
import React from "react";
import AllFeedbackView from "../components/AllFeedbackView/AllFeedbackView";
import AppContainer from "../components/AppContainer/AppContainer";
import { getToken } from "../metal/auth.metal";
import { GroupWork, LowPriority } from "@material-ui/icons"
import { useAtom } from "jotai";
import feedbackAtom from "../data/feedbackData";

function Boards() {

    const [boardView, setBoardView] = React.useState<string>("feedback");
    const [, setFeedbackData] = useAtom(feedbackAtom);

    const getAllFeedBack = async () => {
        let res = await axios.get(`${process.env['REACT_APP_API']}/feedback`, { headers: getToken()});
        setFeedbackData(res.data);
    }

    React.useEffect(()=>{
        getAllFeedBack();
    },[])

    return (
        <AppContainer path="Boards">
            <h1>Boards</h1><br/>
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item>
                    <FormControl variant="outlined" style={{ width: "15em" }}>
                        <InputLabel id="board-view-label">Board View</InputLabel>
                        <Select labelId="board-view-label" id="board-view-label" value={boardView} onChange={(e:any)=>{ setBoardView(e.target.value) }} label="Board View">
                            <MenuItem value={`feedback`}>All Feedback</MenuItem>
                            <MenuItem value={`kanban`}>Kanban View</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Button startIcon={<LowPriority/>} variant="contained" color="primary" disableElevation>Auto Prioritize</Button>
                    <span> </span>
                    <Button startIcon={<GroupWork/>} variant="contained" color="secondary" disableElevation>Smart Group</Button>
                </Grid>
            </Grid>

            <br/><br/>
            {boardView==="feedback"?<AllFeedbackView/>:null}
        </AppContainer>
    )
}

export default Boards;
