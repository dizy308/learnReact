import { useState } from "react";
import data from "./data";

const App = () => {
  const [people, setPeople] = useState(data)
  const [dataState, setDataState] = useState(true)
  const clearPeople = () => {
    setPeople([])
    setDataState(false)
  }
  const updateData = () => {
    setPeople(data)
    setDataState(true)
  }

  return <main>
          <section className="container">
            <h1>There are {people.length} people</h1>
            {people && people.map((item)=>{
              return <div className="person" key={item.id}>
                        <img src={item.image} alt={item.name} />
                        <h4>{item.name}</h4>
                        <p>{item.age}</p>
                        <br />
                      </div>
                    
            })}
            {dataState?<button onClick={clearPeople} className="btn">Clear people</button>:<button onClick={updateData} className="btn">Update people</button>}
          </section>
        </main>
}
export default App;
