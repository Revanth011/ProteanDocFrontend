import { useState, useEffect } from "react";
import axios from "axios";
import "./styles/POC.css";
import Button from '@mui/material/Button';
const uuid = require('uuid');

function POCEdit({ onValueChange, POC }) {
    const [fileId, setFileId] = useState();
    const [fields, setFields] = useState([{}]);
    const [uploadStatus, setUploadStatus] = useState("");
    const [pocError, setPocError] = useState("");

    useEffect(() => { setFields([...POC]); }, [POC])

    const handleFileChange = async (e) => {
        setUploadStatus("Uploading...")
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "singlepart/form-data",
                    },
                }
            );
            setUploadStatus("")
            const updatedFields = fields.map((item) =>
                item.id === fileId ? { ...item, file: response.data.filename } : item
            );
            setFields(updatedFields);
            onValueChange(updatedFields);
        } catch (error) {
            console.log(error.message);
            setPocError(error.message);
        }
    };

    const handleTextChange = (e, id) => {
        const updatedFields = fields.map((item) =>
            item.id === id ? { ...item, text: e.target.value } : item
        );
        setFields(updatedFields);
        onValueChange(updatedFields);
    };

    const handleAddField = () => {
        const newId = fields.length;
        setFields([...fields, { id: uuid.v4(), file: null, text: "" }]);
    };

    const handleRemoveField = (id) => {
        const updatedFields = fields.filter((item) => item.id !== id);
        setFields(updatedFields);
        onValueChange(updatedFields);
    };


    return (
        <div>
            <span>{uploadStatus}</span>
            <span style={{ color: "red" }}>{pocError}</span>
            {fields.map((item, i) => {
                return (
                    <div key={i} className="upload-col">
                        <textarea
                            name=""
                            id=""
                            cols="80"
                            rows="3"
                            type="text"
                            required
                            value={item.text}
                            onChange={(e) => handleTextChange(e, item.id)}
                        ></textarea>
                        <div className="">
                            <span>{item.file}</span>
                            <input type="file" accept="image/*" id="img" onChange={(e) => handleFileChange(e)} style={{ display: "none" }} />
                            <label htmlFor="img" style={{ margin: "0rem 1rem", border: "1px solid black", padding: "0.2rem 1rem" }} id="uploadButton" onClick={(e => setFileId(item.id))} >Upload Image</label>
                            <Button size="small" variant="outlined" onClick={() => handleRemoveField(item.id)}>Remove</Button>
                        </div>
                    </div>
                )
            })}
            <Button type="submit" variant="contained" size="small" onClick={handleAddField}>Add POC</Button>
        </div>
    );
}

export default POCEdit;
