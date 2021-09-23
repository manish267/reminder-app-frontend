import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";

function App() {
  const [reminderMsg, setReminderMsg] = useState("");
  const [remindAt, setRemindAt] = useState();
  const [reminderList, setReminderList] = useState([]);
  
  
  const addReminder = () => {
   
    axios.post(`${process.env.REACT_APP_APP_URL}/addReminder`,{reminderMsg,remindAt}).then(res=>setReminderList(res.data.message))
    setReminderMsg("")
    setRemindAt()
  };
  
  const deleteReminder=(id)=>{
    axios.post(`${process.env.REACT_APP_APP_URL}/deleteReminder`,{id})
    .then(res=>setReminderList(res.data.message))
  }
  
  
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_APP_URL}/getAllReminder`).then(res=>
      setReminderList(res.data.message)
      )
    },[setReminderList])
    
  return (
    <div className="App">
      <div className="homepage">
        <div className="homepage_header">
          <h1>Remind Me 🙋‍♂️</h1>
          <input
            type="text"
            name=""
            id=""
            placeholder="Message For Reminder..."
            value={reminderMsg}
            onChange={(e) => setReminderMsg(e.target.value)}
          />
          <DateTimePicker
            value={remindAt}
            onChange={ setRemindAt}
            minDate={new Date()}
            minutePlaceholder="mm"
            hourPlaceholder="hh"
            dayPlaceholder="DD"
            monthPlaceholder="MM"
            yearPlaceholder="YYYY"
          />
          <div className="button" onClick={addReminder}>
            Add Reminder
          </div>
        </div>

        {/* Card Component */}

        <div className="homepage_body">
        {reminderList.map(el=>( 
          <div key={el._id} className="reminder_card">
            <h2>{el.reminderMsg}</h2>
            <h3>Remind Me At</h3>
            <p>{String(new Date(el.remindAt.toLocaleString('en-US',{timeZone: 'Asia/Calcutta',hour: 'numeric', hour12: true }))).split("GMT")[0]}</p>
            <div className="button" onClick={e=>deleteReminder(el._id)}>Delete</div>
          </div>
          ))}
          
        </div>
      </div>
    </div>
  );
}

export default App;
