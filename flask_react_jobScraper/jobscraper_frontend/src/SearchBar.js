import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import './frontPage.css'; 

function SearchPage() {
    const [sliderValue, setSliderValue] = useState(0);
    const [jobTitle, setJobTitle] = useState("");  // state to capture the search input
    const [jobs, setJobs] = useState([]);  // state to store job search results

    const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
    };

    const handleSearch = () => {
        axios.get(`http://127.0.0.1:5000/api/search?title=${jobTitle}`)
            .then(response => {
                setJobs(response.data);
            });
    };

    return (
        <>

            <Form>
                <Form.Group as={Form.Row} controlId="formPlaintextEmail" className="search-container">
                    <div className="search-group">
                        <Form.Control 
                            type="text" 
                            placeholder="Search Job Title"
                            className="search-input"
                            value={jobTitle}
                            onChange={e => setJobTitle(e.target.value)}
                        />
                    <Button variant="primary" className="search-button" onClick={handleSearch}>
                        Search
                    </Button>
            </div>
                </Form.Group>
            </Form>
            <br />
            <br />

            <div className="accordion-wrapper">

            <Accordion className="accordion-container" style={{ alignItems: 'center' }}>
                    <Accordion.Item eventKey="0">
                    <Accordion.Header>Job Filters (Optional)</Accordion.Header>
                    <Accordion.Body>                     
                            <Form>
                                <Form.Label>Salary</Form.Label>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <span>$0</span>
                                    <span>$300,000</span>
                                </div>

                                <Form.Range
                                    min="0"
                                    max="300000"
                                    step="5000"
                                    value={sliderValue}
                                    onChange={handleSliderChange}
                                />

                                <div style={{ textAlign: 'center', marginTop: 8 }}>
                                    Selected Salary: ${sliderValue}
                                </div>

                                <Form.Group className="mb-3">
                                    <Form.Label>Position Levels</Form.Label>
                                    <Form.Check type="checkbox" id="internship" label="Internship" />
                                    <Form.Check type="checkbox" id="entry-level" label="Entry-Level" />
                                    <Form.Check type="checkbox" id="junior" label="Junior" />
                                    <Form.Check type="checkbox" id="senior" label="Senior" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Job Locations</Form.Label>
                                    <Form.Check type="checkbox" id="remote" label="Remote" />
                                    <Form.Check type="checkbox" id="Hybrid" label="Hybrid" />
                                    <Form.Check type="checkbox" id="inoffice" label="In-Office" />
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
                </tr>
            </thead>
                <tbody>
                    {jobs.map(job => (
                        <tr key={job.id}>
                            <td>{job.id}</td>
                            <td>{job.company}</td>
                            <td>{job.title}</td>
                            <td>{job.location}</td>
                            <td>{job.posted_time}</td>
                            <td><a href={job.link} target="_blank" rel="noopener noreferrer">{job.link}</a></td>
                        </tr>
                    ))}
                </tbody>
            </Table>


        </>
    );
}

export default SearchPage;
