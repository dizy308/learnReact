import { useEffect, useState } from "react";

const CleanupFunction = () => {
  const [toggle, setToggle] = useState(false)

  const switchStatus = () => {
    setToggle(!toggle)
  }
  return <div>
      <button className="btn" onClick={switchStatus}>Change Status</button>
      {toggle && <RandomComponent/>}
    </div>
};

const RandomComponent = () => {
  useEffect(()=>{
    console.log('Some random things')
    const intId = setInterval(()=>{console.log("Some random things 2")}, 1000)
    return () => {
      clearInterval(intId)
    }
  },[])
  return <h1>Hello there</h1>
}


export default CleanupFunction;
