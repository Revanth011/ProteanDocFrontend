import { useState } from "react";
import axios from "axios";
import "./styles/POC.css";
import Button from '@mui/material/Button';

function POC({ onValueChange }) {
  const [fields, setFields] = useState([{ id: 0, file: "", text: "" }]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [pocError, setPocError] = useState("");

  const handleFileChange = async (e, id) => {
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
      const updatedFields = fields.map((item) =>
        item.id === id ? { ...item, file: response.data.filename } : item
      );
      setFields(updatedFields);
      onValueChange(updatedFields);
    } catch (error) {
      console.log(error.message);
      setPocError(error.message);
    }
    setUploadStatus("")

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
    setFields([...fields, { id: newId, file: null, text: "" }]);
  };

  const handleRemoveField = (id) => {
    const updatedFields = fields.filter((item) => item.id !== id);
    setFields(updatedFields);
  };

  return (
    <div>
      <span>{uploadStatus}</span>
      <span style={{ color: "red" }}>{pocError}</span>
      {fields.map((item) => (
        <div key={item.id} className="upload-col">
          <textarea
            name=""
            id=""
            cols="80"
            rows="3"
            type="text"
            value={item.text}
            onChange={(e) => handleTextChange(e, item.id)}
          ></textarea>
          <div className="">
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, item.id)} required />
            <Button size="small" variant="outlined" onClick={() => handleRemoveField(item.id)}>Remove</Button>
          </div>
        </div>
      ))}
      <Button type="submit" variant="contained" size="small" onClick={handleAddField}>Add POC</Button>
    </div>
  );
}

export default POC;
