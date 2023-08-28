import "./styles/FoundVulnerability.css";
import Bullets from "./Bullets";
import POC from "./POC";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from '@mui/material/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

function EditObservation() {

    const [observation, setObservation] = useState({});
    let { reportId, observationId } = useParams();

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/getObservation`, { reportId, ObservationId: observationId })
            .then(response => {
                setObservation(response.data.observation);
            }).catch(error => console.log(error));

    }, []);

    return (
        <form>
            <div className="main">
                <div className="observ">
                    <table>
                        <tbody>
                            <tr>
                                <td id="t-header" colSpan="2">
                                    <div className="" style={{ display: "flex", alignItems: "center" }}>
                                        <span>Observation No.</span>
                                        <input type="text" name="" id="" required style={{ marginLeft: "1rem" }} />
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td id="observ-title" style={{ "width": "160px" }}>Vulnerability</td>
                                <td>
                                    <Select
                                        placeholder="Select"
                                        variant="solid"
                                        color="primary"
                                        size="sm"
                                        required>
                                        <Option value="Open">Open</Option>
                                    </Select>
                                </td>
                            </tr>
                            <tr>
                                <td id="observ-title">Status</td>
                                <td>
                                    <Select
                                        placeholder="Select"
                                        variant="solid"
                                        color="primary"
                                        size="sm"
                                        required={true}
                                    >
                                        <Option value="Open">Open</Option>
                                        <Option value="Close">Close</Option>
                                    </Select>
                                </td>
                            </tr>
                            <tr>
                                <td id="observ-title">Severity</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td id="observ-title">Description</td>
                                <td>
                                    <span>
                                        2
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td id="observ-title">Remediation</td>
                                <td>
                                    <span>
                                        2
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td id="observ-title">Affected URLs</td>
                                <td>
                                    {/* <Bullets onValueChange={handleAffectedURLsValueChange} /> */}
                                </td>
                            </tr>
                            <tr>
                                <td id="observ-title">References</td>
                                <td>
                                    <span>
                                        0
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td id="observ-title">Proof Of Concept</td>
                                <td>
                                    {/* <POC onValueChange={handlePOCValueChange} /> */}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <span id="response-msg">0</span>
                <Button type="submit" style={{ margin: "1rem 0" }} variant="contained" size="small">
                    Save
                </Button>
            </div>
        </form >
    )
}

export default EditObservation;
