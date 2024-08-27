import React from "react";
import Navigation from "../../Navigation/Navigation";
import TopBarComponent from "../../TopBarComponent/TopBarComponent";
const DashBoard = () => {
  return (
    <>
      <Navigation />
      <div style={{ width: "100%" }}>
        <TopBarComponent />
        DashBoard
      </div>
    </>
  );
};
export default DashBoard;
