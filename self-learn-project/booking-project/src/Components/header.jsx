const Calendar = () => {
  return (
    <div className="container">
      <div className="calendar">
        <div className="hour-bars" id="hourBars">

            <CreateCourtBlock />
        </div>
      </div>
    </div>
  )
}

const CreateCourtBlock = () => {
    const startTime = 6
    const endTime = 23
    const courtCount = 5
    const timeSlots = [];

    for (let hour = startTime; hour < endTime; hour++) {
      timeSlots.push(`${String(hour).padStart(2,'0')} - ${String(hour + 1).padStart(2,'0')}`);
    }
    
    return (
      <>
        {/* Header row */}
        <div className="court-block" key="header">
          <div className="court-number">COURT NUMBER</div>
          {timeSlots.map((item, idx) => (
            <div className="time-interval" key={`time-${item}`}>{item}</div>
          ))}
        </div>
        
        {/* Court rows */}
        {Array.from({ length: courtCount }).map((_, i) => (
          <div className="court-block" id={`court_num_${i+1}`} key={`court-${i+1}`}>
            <div className="court-number">Court {i+1}</div>
            <div className="hour-container">
              {timeSlots.map((item, idx) => (
                <div className={`hour-sub-block ${idx+1}`} key={`court-${i+1}-time-${idx}`}></div>
              ))}
            </div>

            {/* Time Value Here */}


          </div>
        ))}
      </>
    );
}

    

export default Calendar