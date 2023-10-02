import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import './frontPage.css'; 

function SearchPage() {
    const [sliderValue, setSliderValue] = useState(0);
    const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
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
                        />
                    <Button variant="primary" className="search-button">
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
                    <th>Apply Link</th>
                </tr>
            </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Google</td>
                        <td>Software Engineer</td>
                        <td><a href="https://www.google.com/about/careers/applications/teams/engineering-technology/" target="_blank"> Apply Here</a></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Amazon</td>
                        <td>Software Developer</td>
                        <td><a href="https://www.amazon.jobs/en/job_categories/software-development" target="_blank"> Apply Here</a></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Apple</td>
                        <td>Software Developer</td>
                        <td><a href="https://www.apple.com/careers/us/software-and-services.html" target="_blank"> Apply Here</a></td>
                    </tr>
                </tbody>
                </Table>


        </>
    );
}

export default SearchPage;
