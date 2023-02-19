import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import {useNavigate} from "react-router-dom";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Divider from "@mui/material/Divider";
import LogoutIcon from '@mui/icons-material/Logout';

export default function ListItems() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/dashboard')
    }

    const goToUploadFile = () => {
        navigate('/uploadFileMain')
    }

    const Logout = () => {
        navigate('/')
    }

    return (
        <React.Fragment>
            <ListItemButton onClick={() => goToHome()}>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard"/>
            </ListItemButton>
            <ListItemButton onClick={() => goToUploadFile()}>
                <ListItemIcon>
                    <FileUploadIcon/>
                </ListItemIcon>
                <ListItemText primary= "File Upload"/>
            </ListItemButton>
            <Divider sx={{my: 1}}/>
            <ListItemButton>
                <ListItemIcon>
                    <ShoppingCartIcon/>
                </ListItemIcon>
                <ListItemText primary="Orders"/>
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <BarChartIcon/>
                </ListItemIcon>
                <ListItemText primary="Reports"/>
            </ListItemButton>
            <ListItemButton onClick={() => Logout()}>
                <ListItemIcon>
                    <LogoutIcon/>
                </ListItemIcon>
                <ListItemText primary="Logout"/>
            </ListItemButton>
        </React.Fragment>
    );
}