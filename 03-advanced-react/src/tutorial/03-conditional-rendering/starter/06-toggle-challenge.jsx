import { useState } from "react";

const ToggleChallenge = () => {
  const [showAlert, setShowAlert] = useState(false)
  const toggleAlert = () => {
    return setShowAlert(!showAlert)
  }

  return (<div>
    <button className="btn" onClick={toggleAlert}>Toggle</button>
    {showAlert &&< Alert/>}
  </div>);
};
const Alert = () => {
  return <div className="alert alert-danger">hello world</div>
}


export default ToggleChallenge;
