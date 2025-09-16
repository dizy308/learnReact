import { useState } from "react";

const UseStateBasics = () => {
  // const value = useState('hello')[0]
  // const func = useState('hello')[1]
  // console.log(value)
  // console.log(func)

  
  const [count, setCount] = useState(0)
  const handleClick = () => {
    console.log(count)
    setCount(count+1)
  }

  return (
    <div>
      <h4>You clicked {count}</h4>
      <button className="btn" type="button" onClick={handleClick}></button>
    </div>
  )
};

export default UseStateBasics;
