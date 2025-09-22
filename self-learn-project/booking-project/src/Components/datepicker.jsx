import React, { useState } from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

function App() {
  const [selectedDate, setDate] = useState(null);

  return (
    <div id='date-filter'>
      <Datepicker selected={selectedDate} onChange={date=>setDate(date)} dateFormat={}/>
    </div>
  );
}

export default App;