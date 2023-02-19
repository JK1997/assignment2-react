import './App.css';
import Dashboard from "./dashboard/Dashboard";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import UploadFileMain from "./dashboard/UploadFileMain";
import Login from "./Login";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <CssBaseline/>
                <Routes>
                    <Route
                        path='/'
                        exact
                        element={<Login/>}
                    />
                    <Route
                        path='/dashboard'
                        exact
                        element={<Dashboard/>}
                    />
                    <Route
                        path='/uploadFileMain'
                        exact
                        element={<UploadFileMain/>}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
