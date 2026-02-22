import React, { useState } from 'react';

const TIME_SLOTS = [
  { start: '8:00 AM', end: '9:00 AM' },
  { start: '9:00 AM', end: '10:00 AM' }, 
  { start: '10:00 AM', end: '11:00 AM' },
  { start: '11:00 AM', end: '12:00 PM' },
  { start: '12:00 PM', end: '1:00 PM' },
  { start: '1:00 PM', end: '2:00 PM' },
  { start: '2:00 PM', end: '3:00 PM' },
  { start: '3:00 PM', end: '4:00 PM' },
  { start: '4:00 PM', end: '5:00 PM' },
  { start: '5:00 PM', end: '6:00 PM' },
];

// Placeholder for booked slots, replace with real data from server
const BOOKED_SLOTS = [
  { date: '2023-06-12', start: '9:00 AM', end: '10:00 AM' },
  { date: '2023-06-13', start: '1:00 PM', end: '2:00 PM' },
  { date: '2023-06-15', start: '4:00 PM', end: '5:00 PM' },
];

export default function PadelReservation() {  
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [email, setEmail] = useState('');
  const [agreedToWaiver, setAgreedToWaiver] = useState(false);
  const [booked, setBooked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send reservation data to server
    setBooked(true); 
  };

  const isSlotBooked = (date, slot) => {
    return BOOKED_SLOTS.some(
      booking => 
        booking.date === date && 
        booking.start === slot.start &&
        booking.end === slot.end
    );
  };

  const isSlotSelected = (slot) => {
    return selectedSlots.some(selected => selected.start === slot.start && selected.end === slot.end);
  };

  const canSelectSlot = (slot) => {
    if (selectedSlots.length === 0) return true;
    const lastSelectedSlot = selectedSlots[selectedSlots.length - 1];
    return slot.start === lastSelectedSlot.end;
  };

  const toggleSlotSelection = (slot) => {
    if (isSlotSelected(slot)) {
      setSelectedSlots(selectedSlots.filter(selected => selected.start !== slot.start));
    } else if (canSelectSlot(slot)) {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };
  
  const renderTimeSlots = () => {
    return TIME_SLOTS.map((slot) => (
      <button 
        key={slot.start}
        onClick={() => toggleSlotSelection(slot)}
        disabled={isSlotBooked(selectedDate, slot) || (!isSlotSelected(slot) && !canSelectSlot(slot))}
        className={`
          w-full py-2 mb-2 rounded 
          ${isSlotSelected(slot) ? 'bg-blue-500 text-white' : 'bg-gray-200'}
          ${isSlotBooked(selectedDate, slot) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-400'}  
        `}
      >
        {slot.start} - {slot.end}
      </button>
    ));
  };

  const renderCalendar = () => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }

    return dates.map(date => (
      <button
        key={date}
        onClick={() => {
          setSelectedDate(date.toISOString().split('T')[0]);
          setSelectedSlots([]);
        }}
        className={`
          w-full py-2 rounded mb-2
          ${selectedDate === date.toISOString().split('T')[0] ? 'bg-blue-500 text-white' : 'bg-gray-200'}
          hover:bg-blue-400
        `}
      >
        {date.toLocaleDateString('en-US', { weekday: 'long', month: 'numeric', day: 'numeric' })}
      </button>
    ));
  };

  if (booked) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold mb-4">Reservation Confirmed!</h1>
        <p>Your reservation is booked for:</p>
        <p className="text-lg font-medium mt-2">
          {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          {' '}from {selectedSlots[0].start} to {selectedSlots[selectedSlots.length - 1].end}  
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">11755 Wilshire Padel Reservations</h1>
      
      <div className="md:flex">
        <div className="md:w-1/2 md:pr-4 mb-4 md:mb-0">
          <h2 className="text-xl font-bold mb-4">Select a Date</h2>
          {renderCalendar()}
        </div>

        <div className="md:w-1/2 md:pl-4">
          {selectedDate ? (
            <>
              <h2 className="text-xl font-bold mb-4">Select Time Slots</h2>
              {renderTimeSlots()}

              <form onSubmit={handleSubmit} className="mt-8">
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="waiver" 
                    checked={agreedToWaiver}
                    onChange={(e) => setAgreedToWaiver(e.target.checked)}
                    required
                  />
                  <label htmlFor="waiver" className="ml-2">
                    I agree to the liability waiver
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={selectedSlots.length === 0}
                  className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Book Reservation
                </button>
              </form>
            </>
          ) : (
            <p className="text-gray-500">Select a date to see available time slots</p>
          )}
        </div>
      </div>
    </div>
  );
}
