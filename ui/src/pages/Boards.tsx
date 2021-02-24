import { FormControl, MenuItem, Select } from "@material-ui/core";
import { InputLabel, List, ListItem } from "@material-ui/core";
import React from "react";
import AppContainer from "../components/AppContainer/AppContainer";

function Boards() {

    const [boardView, setBoardView] = React.useState<string>("feedback");

    return (
        <AppContainer path="Boards">
            <h1>Boards</h1><br/>
            <FormControl variant="outlined" style={{ width: "15em" }}>
                <InputLabel id="board-view-label">Board View</InputLabel>
                <Select labelId="board-view-label" id="board-view-label" value={boardView} onChange={(e:any)=>{ setBoardView(e.target.value) }} label="Board View">
                    <MenuItem value={`feedback`}>All Feedback</MenuItem>
                    <MenuItem value={`kanban`}>Kanban View</MenuItem>
                </Select>
            </FormControl>
            
            <List>
                <ListItem>asdf</ListItem>
                <ListItem>asdf</ListItem>
            </List>
        </AppContainer>
    )
}

export default Boards;
