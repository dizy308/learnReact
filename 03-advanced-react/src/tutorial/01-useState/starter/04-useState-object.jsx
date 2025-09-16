import { useState } from 'react';

const UseStateObject = () => {
  const [person, setPerson] = useState({
    name:'Peter',
    age:24,
    hobby:'Read Books'
  })
  const displayPerson = (name) => {
    // setPerson({name:'Tinker', age:30, hobby:'Play Dota'})
    setPerson({...person,name:'Tinker', age:30})
  }

  return <>
    <h3>{person.name}</h3>
    <h3>{person.age}</h3>
    <h3>Enjoys: {person.hobby}</h3>
    <button className='btn' onClick = {displayPerson}>Click here to change</button>
  </>
};

export default UseStateObject;
