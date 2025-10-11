import { useState, useEffect, useRef} from 'react';
import Loading from './Loading';
import { convertToTime } from '../Utils/timeUtils';

const CourtBlock = ({selectedDate, calendarConfig, openPopup, selectedFreeSlots, setSelectedFreeSlots, refreshTrigger}) => {

    const {courtCount, timeSlots, startCalendar, endCalendar} = calendarConfig
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const hourContainerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, left: 0 })

    const handleFreeSlotClick = (courtId, startFree, endFree) => {
      const slotData = {
        courtId: parseInt(courtId),
        startFree, 
        endFree
      };
      
      setSelectedFreeSlots(prev => {
        // Check if slot exists by comparing all properties
        const exists = prev.some(slot => 
          slot.courtId === slotData.courtId &&
          slot.startFree === slotData.startFree &&
          slot.endFree === slotData.endFree
        );
        
        if (exists) {
          return prev.filter(slot => 
            !(slot.courtId === slotData.courtId &&
              slot.startFree === slotData.startFree &&
              slot.endFree === slotData.endFree)
          );
        } else {
          return [...prev, slotData];
        }
      });
    };

    // CHECK IF SELECTED
    const isSlotSelected = (courtId, startFree, endFree) => {
      return selectedFreeSlots.some(slot => 
        slot.courtId === courtId &&
        slot.startFree === startFree &&
        slot.endFree === endFree
      );
    };


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


      fetchData()}, [selectedDate, refreshTrigger]);

    useEffect(() => {
      if (!isLoading && hourContainerRef.current) {
        const width = hourContainerRef.current.offsetWidth;
        const left = hourContainerRef.current.offsetLeft;
        setDimensions({ width, left })
      }
    }, [isLoading, refreshTrigger])




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
                    }
                  const handleBookingClick = () => {
                    const {start_time, end_time, ...rest} = booked
                    const newData = {court:i+1, booking_date:selectedDate, start_time:convertToTime(start_time), end_time:convertToTime(end_time) , ...rest}
                    console.log(newData)
                    openPopup(newData);
                  } 
                  
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
                  const checkedSlot = isSlotSelected(i+1, start_free, end_free)

                  const pxPerDuration = dimensions.width / (60 * (endCalendar - startCalendar))
                  const startWidth = (start_free - startCalendar) * 60 * pxPerDuration  + dimensions.left
                  const currentDuration = end_free - start_free
                  const currentDurationLength = (currentDuration * 60 * pxPerDuration)

                  const divStyle = {
                    left: `${startWidth}px`,
                    width: `${currentDurationLength}px`,
                    }                
                  return <div className={`duration-sub-block-empty ${start_free}-${end_free} ${checkedSlot?"selected-slot":""}`} 
                            key={`free-slot ${start_free}-{end_free}`} style={divStyle} onClick={()=>handleFreeSlotClick(i+1, start_free, end_free)}></div>
                
                })}
                </div>

             
          </div>)
        })}

      </>
    );
}
export default CourtBlock


