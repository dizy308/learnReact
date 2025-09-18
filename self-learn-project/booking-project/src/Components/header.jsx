const Calendar = () => {
  return (
    <div className="container">
      <div className="calendar">
        <div className="hour-bars" id="hourBars">
          <div className="court-block">
            <div className="court-number">COURT NUMBER</div>
            <CreateTimeInterval />
          </div>
        </div>
      </div>
    </div>
  )
}

const CreateTimeInterval = () => {
    const startTime = 6
    const endTime = 23
    const timeSlots = [];
    for (let hour = startTime; hour < endTime; hour++) {
        timeSlots.push(`${String(hour).padStart(2,'0')} - ${String(hour + 1).padStart(2,'0')}`);
    }
    return (
        <>
          {timeSlots.map((item)=>{return <div className="time-interval">{item}</div>})}
        </>

  )
}

export default Calendar