import React from "react";
import styles from "./NavBar.module.css";
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import StreamsIcon from '@material-ui/icons/DoubleArrow';
import { Link } from "react-router-dom";


function NavBar(props:any) {
    return (
        <ul className={styles.List}>
            <li className={styles.ListItem}><Link to="/boards"><HomeIcon className={props.path==="Boards"?styles.IconStyleActive:styles.IconStyle}/></Link></li>
            <li className={styles.ListItem}><Link to="/streams"><StreamsIcon className={props.path==="Streams"?styles.IconStyleActive:styles.IconStyle}/></Link></li>
            <li className={styles.ListItem}><Link to="/settings"><SettingsIcon className={props.path==="Settings"?styles.IconStyleActive:styles.IconStyle}/></Link></li>
        </ul>
    )
}

export default NavBar;
