import { Button, Container, List, ListItem } from "@material-ui/core";
import React from "react";
import Card from '@material-ui/core/Card';
import styles from "./AllFeedbackView.module.css";
import { useAtom } from "jotai";
import feedbackAtom from "../../data/feedbackData";


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
                                    <h2 className={styles.FeedBackTitle}>{elm.feedback}</h2>
                                    <p className={styles.FeedbackCreator}>Creator : {elm.creatorName} - {elm.creatorEmail}</p><br/>
                                    <p>{elm.description}</p><br/>
                                    <Button size="large" variant="contained" color="primary" disableElevation>View Feedback</Button>
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
