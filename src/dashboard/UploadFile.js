import React, {useState} from 'react';
import axios from 'axios';
import {Alert, Stack} from "@mui/material";

const UploadFile = () => {
    // a local state to store the currently selected file.
    const [selectedFile, setSelectedFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const formData = new FormData();
        if (selectedFile) {
            formData.append("file", selectedFile);
        }

        setProgress(0);

        try {
            const response = await axios.post('http://localhost:8080/uploads', formData);
            console.log(response);
            setMessage("Upload file successfully");
            setSelectedFile(undefined);
            setIsError(false);
        } catch (error) {
            console.log(error);
            setProgress(0);
            setMessage("Could not upload the file!");
            setIsError(true);
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileSelect}/>
                <input type="submit" value="Upload File"/>
            </form>
            <Stack sx={{ width: '100%', mt:2}} spacing={2}>
                {isError && <Alert severity={"error"}>{message}</Alert>}
                {message==="Upload file successfully" && <Alert severity={"success"}>{message}</Alert>}
            </Stack>
        </div>
    )
};

export default UploadFile;