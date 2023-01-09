import { useState, useEffect } from 'react';

function Clock(props){
  const [date, setDate] = useState(new Date());
  
  function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

    const clockStyle = {
        color: localStorage.getItem("secondary_colour"),
        fontSize: "450%"
    }
    const dateStyle = {
        color: localStorage.getItem("secondary_colour"),
        fontSize: "200%"
    }
    const divStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    }
    return (
    <div style = {divStyle}>
        <span style={clockStyle}>
            {date.toLocaleTimeString(localStorage.getItem("clock_style"))}
        </span>

        <br></br>

        <span style={dateStyle}>
            {date.toLocaleDateString(localStorage.getItem("clock_style"))}
        </span>
    </div>
    );
}
export default Clock;