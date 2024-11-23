import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import toast from "react-hot-toast";


const CalendarDisplay = ({setMyDate, myDate}) => {
     const navigate = useNavigate();
     const [selectedDates, setSelectedDates] = useState<Date[]>([]);
     const currentDate = new Date();

     setMyDate(selectedDates)
     console.log( "myDate", myDate)

     const handleDateSelect = (date: Date) => {
          // Check if the selected date is already in the selectedDates array
          const selectedIndex = selectedDates.findIndex((d) => d.toDateString() === date.toDateString());

          if (selectedIndex !== -1) {
               // If the date is already selected, remove it from the array
               setSelectedDates(selectedDates.filter((d, index) => index !== selectedIndex));
          } else {
               // Check if the selection limit is reached
               if (selectedDates.length < 30) {
                    // If the limit is not reached, add the selected date to the array
                    setSelectedDates([...selectedDates, date]);
               } else {
                    // If the limit is reached, display a message or handle the limitation as needed
                    toast.error("You can select up to 30 days only.");
               }
          }
     };

     const tileClassName = ({ date }: { date: Date }) => {
          return selectedDates.some((d) => d.toDateString() === date.toDateString()) ? 'selected' : '';
     };

     return (
          <div className="CalendarContent">
               <div className="calendar">
                    <button className="back-btn" onClick={() => navigate("/subscription")}>
                         <BiArrowBack />
                    </button>

                    <h1>Mark your dates</h1>
                    {/* <p>Dates can be select and can be unselect</p> */}
                    <div className="calendarView">
                         <Calendar
                              onChange={() => { }}
                              value={selectedDates.length > 0 ? selectedDates[0] : null} // Pass the first date in the array as value
                              minDate={currentDate}
                              onClickDay={handleDateSelect}
                              tileClassName={tileClassName}
                         />
                    </div>

                    {/* <button onClick={() => toast.success("Monthly dates added successfully.") && navigate("/subscription")}>Done</button> */}
               </div>
               <div className="listSelectedDates">
                    <h3>Dates Count: <span> {selectedDates.length} </span> &nbsp; <h5>max select upto 30 days</h5></h3>
                    <ul>
                         {selectedDates.map((date, index) => (
                              <li key={index}>{date.toLocaleDateString('en-GB')}</li>
                         ))}
                    </ul>
               </div>

          </div>
     )
}

export default CalendarDisplay;
