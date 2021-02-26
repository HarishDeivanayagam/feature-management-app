import { Button, Chip, Divider, Grid, List, ListItem } from "@material-ui/core";
import React from "react";
import Card from '@material-ui/core/Card';
import styles from "./AllFeedbackView.module.css";
import { useAtom } from "jotai";
import feedbackAtom from "../../data/feedbackData";
import { ArrowDropUp } from "@material-ui/icons";
import { green } from '@material-ui/core/colors';


function AllFeedbackView() {

    const [feedbackData,] = useAtom(feedbackAtom);

    return (
        <div>
            <List>
                {feedbackData!==[]?
                    feedbackData.map((elm:any, index:number)=>{
                        return (
                            <ListItem key={index}>
                                <Card variant="outlined" className={styles.FullWidthCard}>
                                    <Grid container direction="row" justify="flex-start" alignItems="center">
                                        <Grid item style={{ marginLeft: "10px" }}>
                                            <ArrowDropUp style={{ fontSize:"70px", marginTop:"-20px" }}/><br/>
                                            <p style={{ marginLeft:"25px", fontSize:"25px", marginTop:"-20px" }}>{elm.upvotes}</p>
                                        </Grid>
                                        <Grid item style={{ marginLeft:"2em" }}>
                                            <h2 className={styles.FeedBackTitle}>{elm.feedback} <Chip style={{ background:"green", color: "white" }} size="small" label="Enchancement"/></h2>
                                            <p className={styles.FeedbackCreator}>Creator : {elm.creatorName} - {elm.creatorEmail}</p><br/>
                                            <p>{elm.description}</p><br/>
                                            <Button size="large" variant="contained" color="primary" disableElevation>View Feedback</Button>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </ListItem>
                        )
                    })
                :null}
            </List>
        </div>
    )
}

export default AllFeedbackView;
