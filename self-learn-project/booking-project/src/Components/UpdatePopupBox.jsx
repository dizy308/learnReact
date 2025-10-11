import { useState, useEffect } from "react";

const PopupBox = ({isPopupOpen, closePopup, bookedSlotData, refreshBookings}) => {
  const [inputValue, setInputValue] = useState('');
  
  // Update the input value when bookedSlotData changes
  useEffect(() => {
    if (bookedSlotData) {
      setInputValue(bookedSlotData.customer_id || '');
    }
  }, [bookedSlotData]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleConfirm = async () => {
    if (!bookedSlotData) return;

    const url_ = `http://127.0.0.1:8000/apipolls/booking/update/${bookedSlotData.booking_id}`
    
    const updateData = {
          ...bookedSlotData,
          customer_num: inputValue === "" ? "STAFF" : inputValue, 
        }

    console.log(updateData)
    
    try {
      const response = await fetch(url_, { 
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        console.log('Booking updated successfully')
        refreshBookings()
        closePopup()
      } else {
        console.error('Failed to update booking:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error updating booking:', error);

    }
  };


  const handleDelete = async () => {
    if (!bookedSlotData) return;

    const url_ = `http://127.0.0.1:8000/apipolls/booking/update/${bookedSlotData.booking_id}`
    
    try {
      const response = await fetch(url_, { 
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Booking deleted successfully')
        refreshBookings()
        closePopup()
      } else {
        console.error('Failed to delete booking:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error deleting booking:', error);

    }
  };

  return (isPopupOpen && 
    <div className="popup-box-modify open-popup">

      <span className="close-icon" onClick={closePopup}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </span>

      <div className="input-group">
        <label htmlFor="fname">Customer Name:</label>
        <input 
          type="text" 
          id="fname" 
          name="fname" 
          value={inputValue}
          onChange={handleInputChange} 
        />
      </div>

      <div className="button-area">
        
        <button class="delete-button" onClick={handleDelete}>DELETE SCHEDULE</button>
        <button id="confirm-schedule" onClick={handleConfirm}>CONFIRM SCHEDULE</button>
      </div>
    </div>
  )
}

export default PopupBox