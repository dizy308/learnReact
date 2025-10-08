import { useState } from "react";

const CreatePopupBox = ({isCreatePopupOpen, closeCreatePopup, selectedFreeSlots}) => {
  const [inputValue, setInputValue] = useState('');
  

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

const sendInput = () => {
  console.log('selectedFreeSlots:', selectedFreeSlots);
  console.log('Merged:', mergeAdjacentTimeSlots(selectedFreeSlots));
}

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



function mergeAdjacentTimeSlots(timeSlots) {
  if (timeSlots.length === 0) return [];
  
  return [...timeSlots]
    .sort((a, b) => a.courtId - b.courtId || a.startFree - b.startFree)
    .reduce((merged, slot) => {
      const lastSlot = merged[merged.length - 1];
      
      const canMerge = lastSlot && 
        lastSlot.courtId === slot.courtId && 
        lastSlot.endFree === slot.startFree;
      
      return canMerge
        ? [...merged.slice(0, -1), { ...lastSlot, endFree: slot.endFree }]
        : [...merged, { ...slot }];
    }, []);
}