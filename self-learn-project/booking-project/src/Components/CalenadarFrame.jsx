import React, { useState, useEffect} from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns';
import CourtBlock from './CourtBlock';



const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState('2025-08-01')
  const [formattedDate, setFormattedDate] = useState(selectedDate)
  
  const startCalendar = 6
  const endCalendar = 23
  const courtCount = 5
  const timeSlots = [];
  
  for (let hour = startCalendar; hour < endCalendar; hour++) {
    timeSlots.push(`${String(hour).padStart(2,'0')} - ${String(hour + 1).padStart(2,'0')}`);
  }
  const handleDateChange = (date) => {
    setSelectedDate(date)

    if (date) {
      setFormattedDate(format(date, 'yyyy-MM-dd'));
    }
  }

  return (
    <div className="container">
      <div className="calendar">
        <div className="hour-bars" id="hourBars">
          <div className="input-data">
            <div id='date-filter'>
              <Datepicker selected={formattedDate} onChange={handleDateChange} dateFormat="YYYY-MM-dd" id="date-picker" name="datePicker"/>
            </div>
          </div>
            <div className="court-block" key="header">
              <div className="court-number">COURT NUMBER</div>
              {timeSlots.map((item) => (
                <div className="time-interval" key={`time-${item}`}>{item}</div>
              ))}
            </div>
            <CourtBlock selectedDate={formattedDate} courtCount={courtCount} timeSlots={timeSlots} startCalendar={startCalendar} endCalendar={endCalendar}/>
        </div>
      </div>
    </div>
  )
}



export default Calendar



