import React, { useState } from "react";
import Button from '@mui/material/Button';

function Bullets({ onValueChange }) {
  const [textFields, setTextFields] = useState([""]);

  const addTextField = () => {
    setTextFields([...textFields, ""]);
  };

  const removeTextField = (index) => {
    const updatedTextFields = [...textFields];
    updatedTextFields.splice(index, 1);
    setTextFields(updatedTextFields);
  };

  const handleTextFieldChange = (index, value) => {
    const updatedTextFields = [...textFields];
    updatedTextFields[index] = value;
    setTextFields(updatedTextFields);
    onValueChange(updatedTextFields);
  };

  return (
    <div className="add-bullet">
      {textFields.map((value, index) => (
        <div key={index} className="add-bullet-col">
          <textarea
            rows="2"
            cols="80"
            type="text"
            required
            value={value}
            onChange={(e) => handleTextFieldChange(index, e.target.value)}
          />
          <Button onClick={() => removeTextField(index)} size="small" variant="outlined">Remove</Button>
        </div>
      ))}
      <Button onClick={addTextField} size="small" variant="outlined">Add Bullet Field</Button>
    </div>
  );
}

export default Bullets;
