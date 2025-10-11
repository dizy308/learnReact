export const convertToTime = (inputTime) => {
  const hour = parseInt(inputTime);
  const minute = Math.round((inputTime % 1) * 60);
  
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
}


export const mergeAdjacentTimeSlots = (timeSlots) => {
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