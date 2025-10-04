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

  return (isPopupOpen && 
    <div className="popup-box-booking open-popup">
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
        <button id="cancel-schedule" className="cancel-button" onClick={closePopup} >
          CANCEL SCHEDULE
        </button>
        <button id="confirm-schedule" onClick={handleConfirm}>
          CONFIRM SCHEDULE
        </button>
      </div>
    </div>
  )
}

export default PopupBox