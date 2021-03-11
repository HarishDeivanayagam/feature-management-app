import React from "react";
import Loader from "../components/Loader";

function Home() {

    React.useEffect(()=>{
        window.location.href = "/boards"
    },[])
    
    return <Loader/>
}

export default Home;
