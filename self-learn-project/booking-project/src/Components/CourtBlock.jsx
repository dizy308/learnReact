import { useState, useEffect} from 'react';
import Loading from './Loading';

const CourtBlock = ({selectedDate, courtCount, timeSlots, startCalendar, endCalendar}) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
      try {
        const url = `http://127.0.0.1:8000/apipolls/booking/freeslot?date=${selectedDate}`;
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
        setIsLoading(false)
      } 
      catch (error) {
        console.error('Error:', error);
      } 

    };
      fetchData()}
    , [selectedDate]);

    if(isLoading){
        return <Loading/>
    }
    
    return (
      
      
      <>
        {Array.from({ length: courtCount }).map((_, i) => {
          const courtData = data.find(court => court.court_id === i + 1);
          const bookedSlots = courtData ? courtData.booked_slot : [];
          const freeSlots = courtData ? courtData.free_slot : [];
          
          return (
            <div className="court-block" id={`court_num_${i+1}`} key={`court-${i+1}`}>
              {/* Structure Rows */}
              <div className="court-number">{`Court ${i+1}`}</div>
              <div className="hour-container" >
                {timeSlots.map((item, idx) => (
                  <div className={`hour-sub-block ${idx+1}`} key={`court-${i+1}-time-${idx}`}></div>
                ))}
              </div>
              {/* Data Rows */}
              <div className={`duration-container court_${i+1}`}>
                {bookedSlots.map((booked)=>{
                  const {start_time, end_time} = booked
                  
                  return <div className={`duration-sub-block ${start_time}-${end_time}`} ></div> 
                
                })}

              </div>
          </div>)
        })}

      </>
    );
}
export default CourtBlock