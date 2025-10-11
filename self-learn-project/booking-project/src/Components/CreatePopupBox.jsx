import { useState } from "react";
import { convertToTime, mergeAdjacentTimeSlots } from "../Utils/timeUtils";

const CreatePopupBox = ({selectedDate, isCreatePopupOpen, closeCreatePopup, selectedFreeSlots, refreshBookings}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const sendInput = async () => {
    const mergedSlots = mergeAdjacentTimeSlots(selectedFreeSlots);
    const postData = mergedSlots.map((item) => ({
      court: item.courtId,
      start_time: convertToTime(item.startFree),
      end_time: convertToTime(item.endFree),
      booking_date: selectedDate,
      customer_num: inputValue.trim() || "STAFF"
    }));

    try {
      const bookingPromises = postData.map(item => 
        fetch('http://127.0.0.1:8000/apipolls/booking/intradaybooking', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(item)
        }).then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
      );

      await Promise.all(bookingPromises);
      
      alert('Successfully booked all bookings');
      closeCreatePopup();
      
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Some bookings failed. Please try again.');
    }
    finally{
      refreshBookings()
    }
  };

  return (isCreatePopupOpen && 
    <div className="popup-box-booking open-popup">
      <div className="input-group">
        <label htmlFor="fname">Customer Name:</label>
        <input type="text" id="fname" name="fname" value={inputValue} onChange={handleInputChange} />
      </div>

      <div className="button-area">
        <button id="cancel-schedule" className="cancel-button" onClick={closeCreatePopup}>
          CANCEL SCHEDULE
        </button>
        <button id="confirm-schedule" onClick={sendInput}>
          CONFIRM TO CREATE
        </button>
      </div>
    </div>
  )
}

export default CreatePopupBox

