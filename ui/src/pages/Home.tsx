import React from "react";

function Home() {

    React.useEffect(()=>{
        window.location.href = "/boards"
    },[])
    
    return <div>Loading...</div>
}

export default Home;
