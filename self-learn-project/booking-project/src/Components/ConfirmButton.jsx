const ConfirmButton = ({openCreatePopup}) => {
  const handleConfirmButton = () =>{
    openCreatePopup()
  }
  return (
    <button id="confirm-booking" onClick={handleConfirmButton}>CONFIRM SCHEDULE</button>
  )
}
export default ConfirmButton