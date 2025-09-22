'use client' // Add this at the top

import React, { useState, useEffect } from 'react';

const BookingData = () => {
  const [selectedDate, setSelectedDate] = useState('2025-08-02'); // Default date
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);



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


  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="date-picker">
            <label htmlFor="date-picker">Select a date: </label>
            <input type="date"  id="date-picker"value={selectedDate} onChange={handleDateChange} min="2024-01-01" max="2025-12-31"/>
      </div>
      {data.map((item)=>(
        <>
          <div>Court Num  {item.court_id}</div>
          <h4>Free Slots</h4>
          <div>{item.free_slot.map((subitem)=>(
            <div>{subitem[0]} -  {subitem[1]}</div>
            
            ))}
          </div>

          <h4>Booked Slots</h4>
          <div>{item.booked_slot.map((subitem)=>(
            <>
              <div>Booking ID:{subitem.booked_id}</div>
              <div>Booking Time: {subitem.start_time} - {subitem.end_time}</div>
            </>
          ))}
            
          </div>

          <br />
        </>
        ))}
    </>
  );
}

export default BookingData