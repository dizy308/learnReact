import { useState } from "react";

const CreatePopupBox = ({isPopupOpen}) => {
  const [inputValue, setInputValue] = useState('');
  

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (isPopupOpen && 
    <div className="popup-box-booking open-popup">
      <div className="input-group">
        <label htmlFor="fname">Customer Name:</label>
        <input type="text" id="fname" name="fname" value={inputValue} onChange={handleInputChange} />
      </div>

      <div className="button-area">
        <button id="cancel-schedule" className="cancel-button">
          CANCEL SCHEDULE
        </button>
        <button id="confirm-schedule">
          CONFIRM SCHEDULE
        </button>
      </div>
    </div>
  )
}

export default CreatePopupBox