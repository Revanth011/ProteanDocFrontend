import "./styles/ReportHome.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

function ReportsHome() {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/getAllReports").then(response => {
            setReports(response.data.reports);
        }).catch(error => { console.log(error) });
    }, [])

    function downloadReport(id) {
        axios.post("http://localhost:3000/getReport", { id: id })
            .then(response => {
                return axios.post("http://localhost:3000/download", { document: response.data.report.Observations }, {
                    responseType: 'blob',

                })
            }).then((response) => {
                const url = window.URL.createObjectURL(response.data);
                console.log(url)
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${id}.docx`);
                document.body.appendChild(link);
                link.click();
            }).catch(error => { console.log(error) });
    }

    return (
        <div className="report-home">
            <div className="top-bar-report">
                <Link to={"/report/create"}>
                    <Button variant="contained">Create New Report</Button>
                </Link>
                <Link to={"/vulnerability/create"}>
                    <Button variant="contained">Add New Vulnerability</Button>
                </Link>
            </div>
            <table style={{ width: "100%" }}>
                <tbody>
                    <tr>
                        <th>_id</th>
                        <th>Reports Created</th>
                        <th>Date Created</th>
                        <th>Date Updated</th>
                        <th>Company</th>
                        <th>Options</th>
                    </tr>
                    {
                        reports.map((report, i) => {
                            return (
                                <tr key={i}>
                                    <td>{report._id}</td>
                                    <td>{report.ReportTitle}</td>
                                    <td>
                                        <span>{report.createdAt}</span>
                                    </td>
                                    <td>
                                        <span>{report.updatedAt}</span>
                                    </td>
                                    <td>
                                        <span>{report.Company}</span>
                                    </td>
                                    <td className="report-options">
                                        <Link to={`/report/edit/${report._id}`}>
                                            <Button variant="contained" size="small">Edit</Button>

                                        </Link>
                                        <Button variant="contained" startIcon={<DeleteIcon />} size="small">Delete</Button>
                                        <Button variant="contained" size="small" onClick={() => downloadReport(report._id)}>Download</Button>
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

export default ReportsHome;
