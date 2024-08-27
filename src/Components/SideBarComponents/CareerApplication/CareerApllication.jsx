import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Card, Col, Row, Spin, Alert } from "antd";
import TopBarComponent from "../../TopBarComponent/TopBarComponent";
import Navigation from "../../Navigation/Navigation";
import "./style.css";

const { Meta } = Card;
const CareerApplication = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(null);

  // Step 2: Handle form submission and store the form data in state
  const handleFinish = (values) => {
    console.log("Form Data:", values);
    setFormData(values); // Store form data in state
  };
  const dataSource = [
    {
      key: "1",
      Demo: "Demo",
      Demo: "Demo",
    },
    {
      key: "2",
      Demo: "Demo",
      Demo: "Demo",
    },
  ];
  const columns = [
    {
      title: "Demo",
      dataIndex: "Demo",
      key: "Demo",
    },
    {
      title: "Demo",
      dataIndex: "Demo",
      key: "Demo",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://napi.prepseed.com/hightech/getApplication"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result.applicatons); // Note the change here
      } catch (error) {
        setError(error.message);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Navigation />
      <div style={{ width: "100%" }}>
        <TopBarComponent />
        <div className="PortalMainContainer">
          <div style={{ padding: "20px" }}>
            <Row gutter={16}>
              {data.map((application) => (
                <Col span={8} key={application._id}>
                  <Card
                    cover={<img alt="photo" src={application.photo} />} // Assuming `photo` contains the image URL
                  >
                    <Meta
                      title={application.name}
                      description={
                        <>
                          <p>
                            <strong>Name:</strong> {application.name}
                          </p>
                          <p>
                            <strong>Date of Birth:</strong>{" "}
                            {
                              new Date(application.dob)
                                .toISOString()
                                .split("T")[0]
                            }
                          </p>

                          <p>
                            <strong>Gender:</strong> {application.gender}
                          </p>
                          <p>
                            <strong>Contact Number:</strong>{" "}
                            {application.contactNumber}
                          </p>
                          <p>
                            <strong>Email ID:</strong> {application.emailId}
                          </p>
                          <p>
                            <strong>Current Location:</strong>{" "}
                            {application.currentLocation}
                          </p>
                          <p>
                            <strong>Home:</strong> {application.home}
                          </p>
                          <p>
                            <strong>Current Designation:</strong>{" "}
                            {application.currentDesignation}
                          </p>
                          <p>
                            <strong>Total Experience:</strong>{" "}
                            {application.totalExperience}
                          </p>
                          <p>
                            <strong>Qualification:</strong>{" "}
                            {application.qualification}
                          </p>
                          <p>
                            <strong>Position Applied For:</strong>{" "}
                            {application.positionAppliedFor}
                          </p>
                          <p>
                            <strong>Department Applied For:</strong>{" "}
                            {application.departmentAppliedFor}
                          </p>
                          <p>
                            <strong>Skill:</strong> {application.skill}
                          </p>
                          <p>
                            <strong>Current Company:</strong>{" "}
                            {application.currentCompanyName}
                          </p>
                          <p>
                            <strong>Current CTC:</strong>{" "}
                            {application.currentCTC}
                          </p>
                          <p>
                            <strong>Expected CTC:</strong>{" "}
                            {application.expectedCTC}
                          </p>
                          <p>
                            <strong>Notice Period:</strong>{" "}
                            {application.noticePeriod}
                          </p>
                          <p>
                            <strong>Reference:</strong> {application.reference}
                          </p>
                          <p>
                            <strong>Reference of Friend:</strong>{" "}
                            {application.referenceOfFriend}
                          </p>
                          <p>
                            <strong>Reference of Others:</strong>{" "}
                            {application.referenceOfOthers}
                          </p>
                          <p>
                            <strong>Remarks:</strong> {application.remarks}
                          </p>
                          <a
                            href={application.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Resume
                          </a>
                          <a
                            href={application.photo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Photo
                          </a>
                        </>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </div>
    </>
  );
};
export default CareerApplication;
