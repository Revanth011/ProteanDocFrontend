import "./styles/FoundVulnerability.css";
import BulletsEdit from "./BulletsEdit";
import POCEdit from "./POCEdit";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from '@mui/material/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

function EditObservation() {
    const navigate = useNavigate();
    let { reportId, observationId } = useParams();
    const [responseMsg, setResponseMsg] = useState("");

    const [vulnerabilities, setVulnerabilities] = useState([]);
    const [observation, setObservation] = useState({
        ObservationNo: "",
        Vulnerability: "",
        Status: "",
        Severity: "",
        Description: "",
        Remediation: "",
        AffectedURLs: [],
        References: "",
        POC: [],
        ObservationId: ""
    });

    console.log(observation)

    function setVulnerabilityFunc(e, vulnera) {
        setObservation({
            ...observation,
            Vulnerability: vulnera.Vulnerability,
            Severity: vulnera.Severity,
            Description: vulnera.Description,
            Remediation: vulnera.Remediation,
            References: vulnera.References,
        })
    }

    const handleAffectedURLsValueChange = (affectedURLs) => {
        setObservation({ ...observation, AffectedURLs: affectedURLs });
    };

    const handlePOCValueChange = (poc) => {
        setObservation({ ...observation, POC: poc });
    };

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/getObservation`, { reportId, ObservationId: observationId })
            .then(response => {
                setObservation(response.data.observation);

            }).catch(error => console.log(error));

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/getAllVulnerabilities`)
            .then(response => {
                setVulnerabilities(response.data.vulnerabilities);
            }).catch(error => console.log(error));
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
        if (observation.Vulnerability !== "" && observation.Status !== "") {
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/updateObservation`, {
                reportId: reportId,
                observationId: observationId,
                observation
            }).then((response) => {
                setResponseMsg(response.data.message);
                if (response.data.message === "Successful") {
                    navigate("/report/edit/" + reportId)
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="main">
                <div className="observ">
                    <table>
                        <tbody>
                            <tr>
                                <td id="t-header" colSpan="2">
                                    <div className="" style={{ display: "flex", alignItems: "center" }}>
                                        <span>Observation No.</span>
                                        <input type="text" name="" id="" required style={{ marginLeft: "1rem" }} defaultValue={observation.ObservationNo} onChange={e => setObservation({ ...observation, ObservationNo: e.target.value })} />
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td id="observ-title" style={{ "width": "160px" }}>Vulnerability</td>
                                <td>
                                    <Select
                                        placeholder={observation.Vulnerability}
                                        variant="solid"
                                        color="primary"
                                        size="sm"
                                        onChange={(e, newValue) => setVulnerabilityFunc(e, newValue)}
                                        required
                                    >
                                        {
                                            vulnerabilities.map((vulnerability, i) => {
                                                return (
                                                    <Option value={vulnerability} key={i}>{vulnerability.Vulnerability}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </td>
                            </tr>
                            <tr>
                                <td id="observ-title">Status</td>
                                <td>
                                    <Select
                                        placeholder={observation.Status}
                                        variant="solid"
                                        color="primary"
                                        size="sm"
                                        onChange={(e, newValue) => setObservation({ ...observation, Status: newValue })}
                                        required
                                    >
                                        <Option value="Open">Open</Option>
                                        <Option value="Close">Close</Option>
                                    </Select>
                                </td>
                            </tr>
                            <tr>
                                <td id="observ-title">Severity</td>
                                <td>{observation.Severity}</td>
                            </tr>
                            <tr>
                                <td id="observ-title">Description</td>
                                <td>
                                    <span>
                                        {observation.Description}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td id="observ-title">Remediation</td>
                                <td>
                                    <span>
                                        {observation.Remediation}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td id="observ-title">Affected URLs</td>
                                <td>
                                    <BulletsEdit onValueChange={handleAffectedURLsValueChange} affectedURLs={observation.AffectedURLs} />
                                </td>
                            </tr>
                            <tr>
                                <td id="observ-title">References</td>
                                <td>
                                    <span>
                                        {observation.Description}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td id="observ-title">Proof Of Concept</td>
                                <td>
                                    <POCEdit onValueChange={handlePOCValueChange} POC={observation.POC} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <span id="response-msg">{responseMsg}</span>
                <Button type="submit" style={{ margin: "1rem 0" }} variant="contained" size="small">
                    Save
                </Button>
            </div>
        </form >
    )
}

export default EditObservation;
