import { useState } from "react";

const UseStateGotcha = () => {
  const [value, setValue] = useState(0)
  const [value2, setValue2] = useState(0)
  const handleClick = () => {
    setTimeout(()=>{
      console.log('Clicked the button')
      setValue((currentState)=>{
        return currentState + 1
      })
  }, 1000)}

  const handleClick2 = () => {
      console.log('Clicked the 2nd button')
      setValue2((currentState)=>{return currentState + 1})
    }
  
  return <>
    <h1>The current value is {value}</h1>
    <button type="button" className="btn" onClick={handleClick}>Click me</button>

    <h1>The current value2 is {value2}</h1>
    <button type="button" className="btn" onClick={handleClick2}>Click me2</button>
  </>
};

export default UseStateGotcha;
