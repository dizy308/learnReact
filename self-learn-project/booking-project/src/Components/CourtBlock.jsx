import { useState, useEffect, useRef} from 'react';
import Loading from './Loading';


const CourtBlock = ({selectedDate, calendarConfig, openPopup, refreshTrigger}) => {

    const {courtCount, timeSlots, startCalendar, endCalendar} = calendarConfig
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
    , [selectedDate, refreshTrigger]);

    useEffect(() => {
      if (!isLoading && hourContainerRef.current) {
        const width = hourContainerRef.current.offsetWidth;
        const left = hourContainerRef.current.offsetLeft;
        setDimensions({ width, left })
      }
    }, [isLoading, refreshTrigger])

    function convertToTime(inputTime){
      const hour = parseInt(inputTime);
      const minute = Math.round((inputTime % 1) * 60 ) ;
      
      return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
    }




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
                {/* Booked Slots */}
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
                  const handleBookingClick = () => {
                    const {start_time, end_time, ...rest} = booked
                    const newData = {court:i+1, booking_date:selectedDate, start_time:convertToTime(start_time), end_time:convertToTime(end_time) , ...rest}
                    console.log(newData)
                    openPopup(newData);
                  };  
                  
                  return (
                    <div className={`duration-sub-block ${start_time}-${end_time}`} 
                        style={divStyle}
                        key={`booking-${i+1}-${start_time}-${end_time}`} 
                        onClick={handleBookingClick}>{currentDuration>=0.5?customer_id:""}
                    </div> 
                  )
                })}

                {/* Free Slots */}
                {freeSlots.map((free_slot)=>{
                  const [start_free, end_free] = free_slot

                  const pxPerDuration = dimensions.width / (60 * (endCalendar - startCalendar))
                  const startWidth = (start_free - startCalendar) * 60 * pxPerDuration  + dimensions.left
                  const currentDuration = end_free - start_free
                  const currentDurationLength = (currentDuration * 60 * pxPerDuration)

                  const divStyle = {
                    left: `${startWidth}px`,
                    width: `${currentDurationLength}px`,
                    };

                  
                  return <div className={`duration-sub-block-empty ${start_free}-${end_free}`} key={`free-slot ${start_free}-{end_free}`} style={divStyle} ></div>
                
                })}
                </div>

             
          </div>)
        })}

      </>
    );
}
export default CourtBlock