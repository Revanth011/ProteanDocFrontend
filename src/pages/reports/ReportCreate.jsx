import "./styles/ReportCreate.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

function ReportCreate() {
    const [responseMsg, setResponseMsg] = useState("");
    const [report, setReport] = useState({ ReportTitle: "", Company: "" });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/createReport", report);
            setResponseMsg(response.data.message);
            navigate("/")
        } catch (error) {
            console.log(error);
        }

    }

    return (

        <div>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>Report Title</td>
                            <td>
                                <input type="text" style={{ width: "80%" }} onChange={(e) => setReport({ ...report, ReportTitle: e.target.value })} />
                            </td>
                        </tr>
                        <tr>
                            <td>Company</td>
                            <td>
                                <input type="text" style={{ width: "80%" }} onChange={(e) => setReport({ ...report, Company: e.target.value })} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button variant="contained" size="small" style={{ margin: "1rem 0" }} type={"submit"}>Create</Button>
                <p>{responseMsg}</p>
            </form>
        </div>
    )
}

export default ReportCreate;
