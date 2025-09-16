import { useState } from "react";

const UseStateGotcha = () => {
  const [value, setValue] = useState(0)
  const handleClick = () => {
    setTimeout(()=>{
      console.log('Clicked the button')
      setValue((currentState)=>{
        return currentState + 1
      })
  }, 1000)}
  
  return <>
    <h1>The current value is {value}</h1>
    <button type="button" className="btn" onClick={handleClick}>Click me</button>
  </>
};

export default UseStateGotcha;
