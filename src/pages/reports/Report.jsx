import { useState, useEffect } from "react";
import axios from "axios"
import { Link, useParams } from "react-router-dom";
import "./styles/Report.css";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

function Report() {
    const [report, setReport] = useState({});

    let { reportId } = useParams();

    useEffect(() => {
        axios.post("http://localhost:3000/getReport", { id: reportId })
            .then(response => {
                setReport(response.data.report);
            }).catch(error => { console.log(error) });
    }, [])

    return (
        <div className="report">
            <div className="top-bar-report">
                <Link to={`/observation/create/${reportId}`}>
                    <Button variant="contained">Create New Observation</Button>
                </Link>
            </div>
            <table style={{ width: "80%" }}>
                <tbody>
                    <tr>
                        <th>Observation No.</th>
                        <th>Observation</th>
                        <th>Status</th>
                        <th>Severity</th>
                        <th>Options</th>
                    </tr>
                    {
                        report.Observations?.map((observation, i) => {
                            return (
                                <tr key={i}>
                                    <td>
                                        <span>{observation?.ObservationNo}</span>
                                    </td>
                                    <td>
                                        <span>{observation?.Vulnerability}</span>
                                    </td>
                                    <td>
                                        <span>{observation?.Status}</span>
                                    </td>
                                    <td>
                                        <span>{observation?.Severity}</span>
                                    </td>
                                    <td className="report-options">
                                        <Button variant="contained" size="small">Edit</Button>
                                        <Button variant="contained" size="small" startIcon={<DeleteIcon />}>Delete</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Report;
