const ConfirmButton = ({selectedFreeSlots}) => {
  const handleConfirmButton = () =>{
    console.log(selectedFreeSlots)
  }
  return (
    <button id="confirm-booking" onClick={handleConfirmButton}>CONFIRM SCHEDULE</button>
  )
}
export default ConfirmButton