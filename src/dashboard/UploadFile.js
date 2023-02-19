import React, {useState} from 'react';
import axios from 'axios';

const UploadFile = () => {
    // a local state to store the currently selected file.
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubmit = async(event) => {
        event.preventDefault()

        const formData = new FormData();
        if (selectedFile) {
            formData.append("file", selectedFile);
        }
        console.log(selectedFile);

        try {
            const response = await axios.post('http://localhost:8080/uploads', formData);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileSelect}/>
            <input type="submit" value="Upload File" />
        </form>
    )
};

export default UploadFile;