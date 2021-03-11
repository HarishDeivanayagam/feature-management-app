import React from "react";
import styles from "./Component.module.css";

function Modal(props:any) {
    return <div className="flex justify-center"><div className={styles.Modal}>{props.children}</div></div>
}

export default Modal