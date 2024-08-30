import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Col, Card, Row, Spin, Alert, Collapse, Select, Input, AutoComplete } from "antd";
import TopBarComponent from "../../TopBarComponent/TopBarComponent";
import Navigation from "../../Navigation/Navigation";
import "./style.css";
const { Panel } = Collapse;
const { Option } = Select;
const { Search } = Input;
const { Meta } = Card;
const CareerApplication = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);
  // Step 2: Handle form submission and store the form data in state
  const handleFinish = (values) => {
    console.log("Form Data:", values);
    setFormData(values); // Store form data in state
  };
  const uniquePositions = [...new Set(data.map((application) => application.positionAppliedFor))];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://napi.prepseed.com/hightech/getApplication');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result.applicatons);
        setFilteredData(result.applicatons); // Set initial filtered data to all data
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);


  const handlePositionChange = (value) => {
    // setSelectedPosition(value);
    if (value) {
      const filtered = data.filter(application => application.positionAppliedFor === value);
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // Show all data if no position is selected
    }
  };
  const handleSearch = (value) => {
    setSearchQuery(value);
    const lowerCaseQuery = value.toLowerCase();

    if (lowerCaseQuery) {
      const filtered = data.filter(application =>
        (application.name && application.name.toLowerCase().includes(lowerCaseQuery)) ||
        (application.positionAppliedFor && application.positionAppliedFor.toLowerCase().includes(lowerCaseQuery)) ||
        (application.currentLocation && application.currentLocation.toLowerCase().includes(lowerCaseQuery)) ||
        (application.departmentAppliedFor && application.departmentAppliedFor.toLowerCase().includes(lowerCaseQuery)) ||
        (application.skill && application.skill.toLowerCase().includes(lowerCaseQuery))
      );
      setFilteredData(filtered);

      // Set auto-complete options
      const suggestions = data
        .map(app => app.name)
        .filter(name => name && name.toLowerCase().includes(lowerCaseQuery))
        .slice(0, 5); // Limiting to 5 suggestions for brevity

      setAutoCompleteOptions(suggestions.map(name => ({ value: name })));
    } else {
      setFilteredData(data); // Show all data if the search query is empty
      setAutoCompleteOptions([]);
    }
  };


  const handleSelectSuggestion = (value) => {
    setSearchQuery(value);
    const filtered = data.filter(application => application.name === value);
    setFilteredData(filtered);
  };
  console.log("🔴🔴🔴🔴", filteredData)

  return (
    <>
      <Navigation />
      <div style={{ width: "100%", backgroundColor: "#f0f2f5" }}>
        <TopBarComponent />
        <div className="PortalMainContainer">
          <div>
            <div className="portalContainerHeader">
              <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "20px" }}>Career Application</h2>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "end" }}>
              <AutoComplete
                value={searchQuery}
                options={autoCompleteOptions}
                onSearch={handleSearch}
                onSelect={handleSelectSuggestion}
                style={{ marginBottom: 16, width: '200px' }}
                placeholder="Search Applications"
                allowClear
              />
              <Select
                placeholder="Select Position"
                onChange={handlePositionChange}
                allowClear
                style={{ marginBottom: 16, width: '200px' }}
              >
                {uniquePositions.map((position) => (
                  <Option key={position} value={position}>
                    {position}
                  </Option>
                ))}
              </Select>

            </div>
            <Row gutter={24}>
              {filteredData.map((application) => {
                // Convert and format the application date
                const date = new Date(application.createdAt);
                const istDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
                const formattedDate = istDate.toLocaleDateString('en-GB').replace(/\//g, '-');


                const dobDate = new Date(application.dob);
                const istDob = new Date(dobDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
                const formattedDob = istDob.toLocaleDateString('en-GB').replace(/\//g, '-');
                return (
                  <Col span={24} key={application._id}>
                    <Collapse>
                      <Panel
                        header={
                          <div id="CollapsePanel">
                            <div><strong>Name:</strong> {application.name}</div>
                            <div><strong>Position Applied For:</strong> {application.positionAppliedFor}</div>
                          </div>
                        }
                      >
                        <Card
                        // cover={<img alt="photo" src={application.photo} />} // Uncomment if `photo` contains the image URL
                        >
                          <Meta
                            description={
                              <>
                                <p><strong>Application Date:</strong> {formattedDate || '-'}</p>
                                <p><strong>Department Applied For:</strong> {application.departmentAppliedFor || '-'}</p>
                                <p><strong>Position Applied For:</strong> {application.positionAppliedFor || '-'}</p>
                                <p><strong>Skill:</strong> {application.skill || '-'}</p>
                                <p><strong>Name:</strong> {application.name || '-'}</p>
                                <p><strong>Gender:</strong> {application.gender || '-'}</p>
                                <p><strong>Date of Birth:</strong> {formattedDob || '-'}</p>
                                <p><strong>Contact Number:</strong> {application.contactNumber || '-'}</p>
                                <p><strong>Alternate Contact Number:</strong> {application.alternateContactNumber || '-'}</p>
                                <p><strong>Email ID:</strong> {application.emailId || '-'}</p>
                                <p><strong>Qualification:</strong> {application.qualification || '-'}</p>
                                <p><strong>Current Company:</strong> {application.currentCompanyName || '-'}</p>
                                <p><strong>Fresher:</strong> {application.fresher || '-'}</p>
                                <p><strong>Current Company Designation:</strong> {application.currentDesignation || '-'}</p>
                                <p><strong>Total Experience:</strong> {application.totalExperience || '-'} </p>

                                <p><strong>Relevant Experience:</strong></p>
                                {application && application.relevantExperience ? (
                                  <ul style={{color:"black"}}>
                                    <li>Residential: {application.relevantExperience[0].residential || '-'}</li>
                                    <li>commercial: {application.relevantExperience[0].commercial || '-'}</li>
                                    <li>Industrial: {application.relevantExperience[0].industrial || '-'}</li>
                                    <li>Institutional: {application.relevantExperience[0].institutional || '-'}</li>
                                    <li>Others: {application.relevantExperience[0].others || '-'}</li>
                                  </ul>
                                ) : (
                                  <p>No relevant experience data available.</p>
                                )}



                                <p><strong>Current Job Location:</strong> {application.currentLocation || '-'}</p>
                                <p><strong>Home Location:</strong> {application.home || '-'}</p>
                                <p><strong>Current CTC:</strong> {application.currentCTC || '-'}</p>
                                <p><strong>Expected CTC:</strong> {application.expectedCTC || '-'}</p>
                                <p><strong>Notice Period:</strong> {application.noticePeriod || '-'}</p>
                                <p><strong>Reference:</strong> {application.reference || '-'}</p>
                                <p><strong>Reference of Friend:</strong> {application.referenceOfFriend || '-'}</p>
                                <p><strong>Reference of Others:</strong> {application.referenceOfOthers || '-'}</p>
                                <p><strong>Remarks:</strong> {application.remarks || '-'}</p>
                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                  <a href={application.resume} target="_blank" rel="noopener noreferrer">View Resume</a>
                                  <br />
                                  <a href={application.photo} target="_blank" rel="noopener noreferrer">View Photo</a>
                                </div>
                              </>
                            }
                          />
                        </Card>
                      </Panel>
                    </Collapse>
                  </Col>
                );
              })}

            </Row>

          </div>
          {/* <Table dataSource={dataSource} columns={columns} /> */}
        </div>
      </div>
    </>
  );
};
export default CareerApplication;
