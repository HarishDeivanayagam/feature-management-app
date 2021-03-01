import React from "react";
import { Link } from "react-router-dom";
import ChartsIcon from "./icons/ChartsIcon";
import SettingsIcon from "./icons/SettingsIcon";
import StreamsIcon from "./icons/StreamsIcon";
import ViewBoard from "./icons/ViewBoard";

interface NavProps {
    path:string
}

function NavBar(props:NavProps) {
    return (
        <ul className="pt-5 pb-5 pl-2 pr-2">
            <li className={`p-2 mb-10 rounded-full ${props.path==="/boards"?'bg-purple-400':'hover:bg-purple-400 transition-colors'}`}><Link to="/boards"><ViewBoard/></Link></li>
            <li className={`p-2 mb-10 rounded-full ${props.path==="/analytics"?'bg-purple-400':'hover:bg-purple-400 transition-colors'}`}><Link to="/analytics"><ChartsIcon/></Link></li>
            <li className={`p-2 mb-10 rounded-full ${props.path==="/streams"?'bg-purple-400':'hover:bg-purple-400 transition-colors'}`}><Link to="/streams"><StreamsIcon/></Link></li>
            <li className={`p-2 mb-10 rounded-full ${props.path==="/settings"?'bg-purple-400':'hover:bg-purple-400 transition-colors'}`}><Link to="/settings"><SettingsIcon/></Link></li>
        </ul>
    )
}

export default NavBar;
