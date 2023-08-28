import "./styles/ReportHome.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import CloseDialog from "../components/CloseDialog";

function ReportsHome() {
    const [reports, setReports] = useState([]);
    const [open, setOpen] = useState(false);
    const [deleteReportId, setDeleteReportId] = useState("");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/getAllReports`).then(response => {
            setReports(response.data.reports);
        }).catch(error => { console.log(error) });
    }, [])

    function downloadReport(id) {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/getReport`, { id: id })
            .then(response => {
                return axios.post(`${process.env.REACT_APP_BACKEND_URL}/download`, { document: response.data.report.Observations, id: response.data.report._id }, {
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

    function deleteReport(id) {
        axios.patch(`${process.env.REACT_APP_BACKEND_URL}/deleteReport`, { id: deleteReportId })
            .then((response) => {
                return axios.get(`${process.env.REACT_APP_BACKEND_URL}/getAllReports`);
            }).then((response) => {
                if (response.data.reports) {
                    setReports(response.data.reports);
                }
            })
            .catch((error) => console.log(error))
        setOpen(false);
    }

    function handleOpen(id) {
        setDeleteReportId(id);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

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
                        <th>Last Updated</th>
                        <th>Company</th>
                        <th>Options</th>
                    </tr>
                    {
                        reports.map((report, i) => {
                            return (
                                <tr key={i}>
                                    <td>{report._id}</td>
                                    <td style={{ width: "30%" }}>{report.ReportTitle}</td>
                                    <td>
                                        <span>{moment(report.createdAt).format("lll")}</span>
                                    </td>
                                    <td>
                                        <span>{moment(report.updatedAt).fromNow()}</span>
                                    </td>
                                    <td style={{ width: "10%" }}>
                                        <span>{report.Company}</span>
                                    </td>
                                    <td className="report-options">
                                        <Link to={`/report/edit/${report._id}`}>
                                            <Button variant="contained" size="small">Edit</Button>

                                        </Link>
                                        <Button variant="contained" startIcon={<DeleteIcon />} size="small" onClick={() => handleOpen(report._id)}>Delete</Button>
                                        <Button variant="contained" size="small" onClick={() => downloadReport(report._id)}>Download</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
            <CloseDialog open={open} handleClose={handleClose} deleteFunc={deleteReport} />
        </div>
    )
}

export default ReportsHome;
