import React from "react";
import NavBar from "../NavBar/NavBar";
import styles from "./AppContainer.module.css";


function AppContainer(props:any) {
    return (
        <div className={styles.AppHolder}>
            <div className={styles.NavHolder}><NavBar path={props.path}/></div>
            <div className={styles.ViewHolder}>{props.children}</div>
        </div>
    )
}

export default AppContainer;