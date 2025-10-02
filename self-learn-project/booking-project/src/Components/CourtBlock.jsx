import { useState, useEffect, useRef} from 'react';
import Loading from './Loading';

const CourtBlock = ({selectedDate, courtCount, timeSlots, startCalendar, endCalendar}) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const hourContainerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, left: 0 })


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

    useEffect(() => {
      if (!isLoading && hourContainerRef.current) {
        const width = hourContainerRef.current.offsetWidth;
        const left = hourContainerRef.current.offsetLeft;
        setDimensions({ width, left })
      }
    }, [isLoading]); // Runs when loading state or data changes


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
              <div className="hour-container" ref={hourContainerRef}>
                {timeSlots.map((item, idx) => (
                  <div className={`hour-sub-block ${idx+1}`} key={`court-${i+1}-time-${idx}`}></div>
                ))}
              </div>
              {/* Data Rows */}
              <div className={`duration-container court_${i+1}`}>
                {bookedSlots.map((booked)=>{
                  const {start_time, end_time, customer_id} = booked
                  const pxPerDuration = dimensions.width / (60 * (endCalendar - startCalendar))
                  const startWidth = (start_time - startCalendar) * 60 * pxPerDuration  + dimensions.left
                  const currentDuration = end_time - start_time
                  const currentDurationLength = (currentDuration * 60 * pxPerDuration)

                  const divStyle = {
                    left: `${startWidth}px`,
                    width: `${currentDurationLength}px`,
                    backgroundColor: "#00cf77",
                    };
                  
                  return <div className={`duration-sub-block ${start_time}-${end_time}`} style={divStyle}>{currentDuration>=0.5?customer_id:""}</div> 
                
                })}

              </div>
          </div>)
        })}

      </>
    );
}
export default CourtBlock