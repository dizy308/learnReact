import { useState } from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns';
import CourtBlock from './CourtBlock';
import PopupBox from './PopupBox';




const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState('2025-08-01')
  const [formattedDate, setFormattedDate] = useState(selectedDate)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [popupData, setPopupData] = useState(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)


  const openPopup = (bookedSlotData) => {
    setPopupData(bookedSlotData)
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupData(null)
  };
  
  const refreshBookings = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  
  const startCalendar = 6
  const endCalendar = 23
  const courtCount = 5
  const timeSlots = [];
  for (let hour = startCalendar; hour < endCalendar; hour++) {
    timeSlots.push(`${String(hour).padStart(2,'0')} - ${String(hour + 1).padStart(2,'0')}`);
  }
  const calendarConfig = {
        startCalendar,
        endCalendar,
        courtCount,
        timeSlots
      };


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
            <CourtBlock selectedDate={formattedDate} calendarConfig={calendarConfig} openPopup={openPopup} refreshTrigger={refreshTrigger} />
            
        </div>
      </div>
      <PopupBox isPopupOpen={isPopupOpen} closePopup={closePopup} bookedSlotData={popupData} refreshBookings={refreshBookings}/>
    </div>
  )
}



export default Calendar



