import "./styles/FoundVulnerability.css";
import Bullets from "./Bullets";
import POC from "./POC";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from '@mui/material/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
const uuid = require('uuid');

function Observation() {
  const navigate = useNavigate();

  let { reportId } = useParams();

  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [responseMsg, setResponseMsg] = useState("");
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
    ObservationId: uuid.v4()
  });

  const handleAffectedURLsValueChange = (affectedURLs) => {
    setObservation({ ...observation, AffectedURLs: affectedURLs });
  };

  const handlePOCValueChange = (poc) => {
    setObservation({ ...observation, POC: poc });
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (observation.Vulnerability !== "" && observation.Status !== "") {
      axios.patch(`${process.env.REACT_APP_BACKEND_URL}/addObservation`, {
        _id: reportId,
        Observations: observation
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

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/getAllVulnerabilities`)
      .then(response => {
        setVulnerabilities(response.data.vulnerabilities);
      }).catch(error => console.log(error));

  }, []);

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
                    <input type="text" name="" id="" required style={{ marginLeft: "1rem" }}
                      onChange={(e) =>
                        setObservation({
                          ...observation,
                          ObservationNo: parseInt(e.target.value),
                        })
                      } />
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
                    onChange={(e, newValue) => setVulnerabilityFunc(e, newValue)}
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
                    placeholder="Select"
                    variant="solid"
                    color="primary"
                    size="sm"
                    required={true}
                    onChange={(e, newValue) =>
                      setObservation({
                        ...observation,
                        Status: newValue,
                      })
                    }
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
                  <Bullets onValueChange={handleAffectedURLsValueChange} />
                </td>
              </tr>
              <tr>
                <td id="observ-title">References</td>
                <td>
                  <span>
                    {observation.References}
                  </span>
                </td>
              </tr>
              <tr>
                <td id="observ-title">Proof Of Concept</td>
                <td>
                  <POC onValueChange={handlePOCValueChange} />
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
  );
}

export default Observation;
