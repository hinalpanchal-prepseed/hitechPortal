import React from "react";
import Navigation from "../../Navigation/Navigation";
import TopBarComponent from "../../TopBarComponent/TopBarComponent";
const Employee = () => {
  return (
    <>
      <Navigation />
      <div style={{ width: "100%", backgroundColor: "#f0f2f5" }}>
        <TopBarComponent />
        <div className="PortalMainContainer">
          <div className="portalContainerHeader">
            <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "20px" }}> Employee Details</h2>
          </div>

        </div>

      </div>
    </>
  );
};
export default Employee;
