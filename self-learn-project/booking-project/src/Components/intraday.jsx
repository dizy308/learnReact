import React, { useState, useEffect, useRef } from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns';

const startTime = 6
const endTime = 23
const courtCount = 5
const timeSlots = [];

for (let hour = startTime; hour < endTime; hour++) {
  timeSlots.push(`${String(hour).padStart(2,'0')} - ${String(hour + 1).padStart(2,'0')}`);
}


const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState('2025-08-01')
  const [formattedDate, setformattedDate] = useState(selectedDate)

  const handleDateChange = (date) => {
    setSelectedDate(date)

    if (date) {
      setformattedDate(format(date, 'yyyy-MM-dd'));
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



            <CreateCourtBlock selectedDate={formattedDate}/>
        </div>
      </div>
    </div>
  )
}

const CreateCourtBlock = ({selectedDate}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const hourContainerRefs = useRef({});

    useEffect(() => {
      const fetchData = async () => {
      try {
        const url = `http://127.0.0.1:8000/apipolls/booking/freeslot?date=${selectedDate}`;
        const response = await fetch(url);
        const result = await response.json();
        console.log(result)
        setData(result);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
      fetchData();
  
      
    }, [selectedDate]);

    const getHourContainerRef = (courtId) => {
      if (!hourContainerRefs.current[courtId]) {
        hourContainerRefs.current[courtId] = React.createRef();
      }
      return hourContainerRefs.current[courtId];
    };
    
    return (
      <>
            {Array.from({ length: courtCount }).map((_, i) => {
            const hourContainerRef = getHourContainerRef(i+1);

            return <div className="court-block" id={`court_num_${i+1}`} key={`court-${i+1}`}>
                {/* Structure Rows */}
                <div className="court-number">Court {i+1}</div>
                <div className="hour-container" ref={hourContainerRef}>
                  {timeSlots.map((item, idx) => (
                    <div className={`hour-sub-block ${idx+1}`} key={`court-${i+1}-time-${idx}`}></div>
                  ))}
                </div>

                {/* Data Rows */}
                <div className={`duration-container court_${i+1}`}>
                  {data && data.filter(item => item.court_id === i+1).map((item)=>(item.booked_slot.map((booked) => {

                        const container = hourContainerRef.current;
                        const containerWidth = container.offsetWidth
                        const containerLeft = container.offsetLeft
                        
                        const pxPerDuration = containerWidth / (60 * (endTime - startTime));
                        const left = (booked.start_time - startTime) * 60 * pxPerDuration + containerLeft;
                        const width = (booked.end_time - booked.start_time) * 60 * pxPerDuration;


                        const  style = {
                            left: `${left}px`,
                            width: `${width}px`,
                            backgroundColor: "#00cf77",
                          }
                      
                    return <div className="duration-sub-block" style={style} key={`duration-sub-block ${booked.start_time}-${booked.end_time}`}>{width>=60? booked.customer_id:""}</div>})

                ))}
                </div>

            </div>})
            }

      </>
    );
}

export default Calendar



