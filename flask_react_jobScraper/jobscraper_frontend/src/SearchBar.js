import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "./frontPage.css";

function SearchPage() {
  const [sliderValue, setSliderValue] = useState(0);
  const [jobTitle, setJobTitle] = useState("");
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedState, setSelectedState] = useState(""); // Add state for the selected state

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };



  
  const handleSearch = () => {
    axios
      .get(`http://127.0.0.1:5000/api/search`, {
        params: {
          title: jobTitle,
          state: selectedState, // Include selected state in the request
        },
      })
      .then((response) => {
        setJobs(response.data); 
      });
  };

  const reportScam = (jobId) => {
    axios
      .post(`http://127.0.0.1:5000/api/report-scam?id=${jobId}`)
      .then((response) => {
        if (response.data.message === "Scam reported successfully") {
          // Assume response.data.reportCount contains the new report count
          setJobs((currentJobs) => {
            return currentJobs.map((job) => {
              if (job.id === jobId) {
                return { ...job, reportCount: response.data.reportCount };
              }
              return job;
            });
          });
          setModalMessage(`ID ${jobId} reported as a scam successfully.`);
        }
        setShowModal(true);
      })
      .catch((error) => {
        setModalMessage(
          `Error while reporting ID ${jobId} as a scam: ${error.message}`
        );
        setShowModal(true);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const states = [
    { abbreviation: 'AL', name: 'Alabama' },
    { abbreviation: 'AK', name: 'Alaska' },
    { abbreviation: 'AZ', name: 'Arizona' },
    { abbreviation: 'AR', name: 'Arkansas' },
    { abbreviation: 'CA', name: 'California' },
    { abbreviation: 'CO', name: 'Colorado' },
    { abbreviation: 'CT', name: 'Connecticut' },
    { abbreviation: 'DE', name: 'Delaware' },
    { abbreviation: 'FL', name: 'Florida' },
    { abbreviation: 'GA', name: 'Georgia' },
    { abbreviation: 'HI', name: 'Hawaii' },
    { abbreviation: 'ID', name: 'Idaho' },
    { abbreviation: 'IL', name: 'Illinois' },
    { abbreviation: 'IN', name: 'Indiana' },
    { abbreviation: 'IA', name: 'Iowa' },
    { abbreviation: 'KS', name: 'Kansas' },
    { abbreviation: 'KY', name: 'Kentucky' },
    { abbreviation: 'LA', name: 'Louisiana' },
    { abbreviation: 'ME', name: 'Maine' },
    { abbreviation: 'MD', name: 'Maryland' },
    { abbreviation: 'MA', name: 'Massachusetts' },
    { abbreviation: 'MI', name: 'Michigan' },
    { abbreviation: 'MN', name: 'Minnesota' },
    { abbreviation: 'MS', name: 'Mississippi' },
    { abbreviation: 'MO', name: 'Missouri' },
    { abbreviation: 'MT', name: 'Montana' },
    { abbreviation: 'NE', name: 'Nebraska' },
    { abbreviation: 'NV', name: 'Nevada' },
    { abbreviation: 'NH', name: 'New Hampshire' },
    { abbreviation: 'NJ', name: 'New Jersey' },
    { abbreviation: 'NM', name: 'New Mexico' },
    { abbreviation: 'NY', name: 'New York' },
    { abbreviation: 'NC', name: 'North Carolina' },
    { abbreviation: 'ND', name: 'North Dakota' },
    { abbreviation: 'OH', name: 'Ohio' },
    { abbreviation: 'OK', name: 'Oklahoma' },
    { abbreviation: 'OR', name: 'Oregon' },
    { abbreviation: 'PA', name: 'Pennsylvania' },
    { abbreviation: 'RI', name: 'Rhode Island' },
    { abbreviation: 'SC', name: 'South Carolina' },
    { abbreviation: 'SD', name: 'South Dakota' },
    { abbreviation: 'TN', name: 'Tennessee' },
    { abbreviation: 'TX', name: 'Texas' },
    { abbreviation: 'UT', name: 'Utah' },
    { abbreviation: 'VT', name: 'Vermont' },
    { abbreviation: 'VA', name: 'Virginia' },
    { abbreviation: 'WA', name: 'Washington' },
    { abbreviation: 'WV', name: 'West Virginia' },
    { abbreviation: 'WI', name: 'Wisconsin' },
    { abbreviation: 'WY', name: 'Wyoming' },
    
  ];

  return (
    <>
      <Form>
        <Form.Group
          as={Form.Row}
          controlId="formPlaintextEmail"
          className="search-container"
        >
          <div className="search-group">
            <Form.Control
              type="text"
              placeholder="Search Job Title"
              className="search-input"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <Button
              variant="primary"
              className="search-button"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </Form.Group>
      </Form>
      <br />
      <br />

      <div className="accordion-wrapper">
        <Accordion
          className="accordion-container"
          style={{ alignItems: "center" }}
        >
          <Accordion.Item eventKey="0">
            <Accordion.Header>Job Filters (Optional)</Accordion.Header>
            <Accordion.Body>
              <Form>
                

                <Form.Group className="mb-3">
                  <Form.Label>Position Levels</Form.Label>
                  <Form.Check
                    type="checkbox"
                    id="internship"
                    label="Internship"
                  />
                  <Form.Check
                    type="checkbox"
                    id="entry-level"
                    label="Entry-Level"
                  />
                  <Form.Check type="checkbox" id="junior" label="Junior" />
                  <Form.Check type="checkbox" id="senior" label="Senior" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Job Locations</Form.Label>
                  <Form.Check type="checkbox" id="remote" label="Remote" />
                  <Form.Check type="checkbox" id="Hybrid" label="Hybrid" />
                  <Form.Check type="checkbox" id="inoffice" label="In-Office" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Select State</Form.Label>
                  <Form.Select
                    id="state"
                    value={selectedState}
                    onChange={handleStateChange}
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.abbreviation} value={state.abbreviation}>
                        {state.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>Job Title</th>
            <th>Location</th>
            <th>Time Posted</th>
            <th>Apply Link</th>
            <th>Report Count</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>{job.company}</td>
              <td>{job.title}</td>
              <td>{job.location}</td>
              <td>{job.posted_time}</td>
              <td>
                <a href={job.link} target="_blank" rel="noopener noreferrer">
                {job.link}
                </a>
              </td>
              <td>{job.report_count}</td>
              <td>
                {!job.isScam && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Button onClick={() => reportScam(job.id)} variant="danger">
                      Report
                    </Button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Modal component */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Report Scam</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SearchPage;































  







