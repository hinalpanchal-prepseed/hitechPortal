import React from "react";
import Navigation from "../../Navigation/Navigation";
import TopBarComponent from "../../TopBarComponent/TopBarComponent";
const Employee = () => {
  return (
    <>
      <Navigation />
      <div style={{ width: "100%" }}>
        <TopBarComponent />
        Employee Details
      </div>
    </>
  );
};
export default Employee;
