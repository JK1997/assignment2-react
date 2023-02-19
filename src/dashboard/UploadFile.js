import React, {useState} from 'react';
import axios from 'axios';
import {Alert, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import UploadIcon from '@mui/icons-material/Upload';

const UploadFile = () => {
    // a local state to store the currently selected file.
    const [selectedFile, setSelectedFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
        console.log(selectedFile);
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
                <Button variant="contained" component="label" sx={{mt:4}}>
                    Choose File
                    <input hidden accept="text/csv/*" multiple type="file" onChange={handleFileSelect}/>
                </Button>
                <div className="file-name">
                    {selectedFile && selectedFile.name}
                </div>
                <Button type="submit"  variant="outlined" startIcon={<UploadIcon />} disabled={!selectedFile} sx={{mt:4}}>
                    Upload
                </Button>
            </form>
            <Stack sx={{ width: '100%', mt:2}} spacing={2}>
                {isError && <Alert severity={"error"}>{message}</Alert>}
                {message==="Upload file successfully" && <Alert severity={"success"}>{message}</Alert>}
            </Stack>
        </div>
    )
};

export default UploadFile;