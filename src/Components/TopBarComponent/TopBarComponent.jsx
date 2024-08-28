import React, { useEffect, useState } from "react";
import "./TopBarComponent.css"
const TopBarComponent = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Night");
    }
  }, []);
  
  return (
    <div className="CommonBar">
     
      <div id="Topbar">
      {greeting}, Hitech
      </div>
    </div>
  );
};

export default TopBarComponent;
