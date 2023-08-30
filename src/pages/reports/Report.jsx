import { useState, useEffect } from "react";
import axios from "axios"
import { Link, useParams } from "react-router-dom";
import "./styles/Report.css";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseDialog from "../components/CloseDialog";

function Report() {
    const [report, setReport] = useState({});
    const [open, setOpen] = useState(false);
    const [deleteObser, setDeleteObser] = useState({ deleteId: "", deleteObservation: {} })

    let { reportId } = useParams();

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/getReport`, { id: reportId })
            .then(response => {
                setReport(response.data.report);
            }).catch(error => { console.log(error) });
    }, [])

    function handleOpen(id, observ) {
        setDeleteObser({ deleteId: id, deleteObservation: observ })
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const deleteObservation = () => {
        axios.patch(`${process.env.REACT_APP_BACKEND_URL}/deleteObservationFromReport`, {
            id: reportId,
            observation: deleteObser.deleteObservation,
        }).then((response) => {
            if (response.data.report) {
                setReport(response.data.report);
            }
        }).catch((error) => console.log(error))
        setOpen(false);
    }

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
                                    <td style={{ width: "40%" }}>
                                        <span>{observation?.Vulnerability}</span>
                                    </td>
                                    <td>
                                        <span>{observation?.Status}</span>
                                    </td>
                                    <td>
                                        <span>{observation?.Severity}</span>
                                    </td>
                                    <td className="report-options">
                                        <Link to={`/observation/edit/${reportId}/${observation.ObservationId}`}>
                                            <Button variant="contained" size="small">Edit</Button>
                                        </Link >
                                        <Button variant="contained" onClick={() => handleOpen(observation.ObservationId, observation)} size="small" startIcon={<DeleteIcon />}>Delete</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <CloseDialog open={open} handleClose={handleClose} deleteFunc={deleteObservation} />
        </div>
    )
}

export default Report;
