import './App.css';
import Dashboard from "./dashboard/Dashboard";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <CssBaseline/>
                <Routes>
                    <Route
                        path='/'
                        exact
                        element={<Dashboard/>}
                    />
                    <Route
                        path='/dashboard'
                        exact
                        element={<Dashboard/>}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
