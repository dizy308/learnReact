import { useState, useEffect} from 'react';
import Loading from './loading';

const CourtBlock = ({selectedDate, courtCount, timeSlots}) => {
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
      fetchData();
  
      
    }, [selectedDate]);

    if(isLoading){
        return <Loading/>
    }
    
    return (
      <>
            {Array.from({ length: courtCount }).map((_, i) => {
            return <div className="court-block" id={`court_num_${i+1}`} key={`court-${i+1}`}>
                {/* Structure Rows */}
                <div className="court-number">Court {i+1}</div>
                <div className="hour-container" >
                  {timeSlots.map((item, idx) => (
                    <div className={`hour-sub-block ${idx+1}`} key={`court-${i+1}-time-${idx}`}></div>
                  ))}
                </div>
                {/* Data Rows */}


            </div>})
            }

      </>
    );
}
export default CourtBlock