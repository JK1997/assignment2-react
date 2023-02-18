import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {useEffect, useState} from 'react';
import apiService from "../apiService/APIService";
import {CircularProgress, FormControl, FormHelperText, InputAdornment, OutlinedInput} from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import axios from "axios";

function ECommerceTable() {
    const [filterRecords, setFilterRecords] = useState("");
    const [ecommerceData, setEcommerceData] = useState([]);

    const handleFilter = () => {
        axios
            .get(`http://localhost:8080/getAllECommerce?size=${filterRecords}`)
            .then(response => setEcommerceData(response.data))
            .catch(error =>  console.error('Error fetching eCommerce data:', error));
    };

    useEffect(() => {
        apiService.getECommerce()
            .then(response => setEcommerceData(response.data))
            .catch(error => console.error('Error fetching eCommerce data:', error));
    }, []);

    console.log(ecommerceData);

    if (ecommerceData.length === 0) {
        return <div><CircularProgress/><h3>Loading...</h3></div>;
    }

    // convert HashMap key and values to first values only
    const eCommerceRows = Object.values(ecommerceData)[0];
    //Get totalNumberOfECommerce
    const totalNumberOfECommerce = Object.values(ecommerceData)[1];
    console.log(eCommerceRows);

    //Convert 2D arrays [][] to array only [] because data grid rows only accept array
    const rows = eCommerceRows.flat();
    console.log(rows);

    const columns = [
        {field: 'id', headerName: 'ID', width: 100},
        {field: 'invoiceNo', headerName: 'Invoice No', width: 150},
        {field: 'stockCode', headerName: 'Stock Code', width: 150},
        {field: 'description', headerName: 'Description', width: 250},
        {field: 'quantity', headerName: 'Quantity', width: 100},
        {field: 'invoiceDate', headerName: 'Invoice Date', width: 150},
        {field: 'unitPrice', headerName: 'Unit Price', width: 150},
        {field: 'customerId', headerName: 'Customer ID', width: 150},
        {field: 'country', headerName: 'Country', width: 150},
    ];

    return (
        <div style={{width: '100%'}}>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Typography variant="h4">Orders</Typography>
                </Grid>
                <Grid item xs={5}>
                </Grid>
                <Grid item xs={5}>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            type="text"
                            value={filterRecords}
                            onChange={(e) => setFilterRecords(e.target.value)}
                            placeholder="10000"
                            endAdornment={<InputAdornment position="end">/ {totalNumberOfECommerce}</InputAdornment>}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                        />
                        <FormHelperText id="outlined-weight-helper-text">Filter number of records / Total</FormHelperText>
                    </FormControl>
                    <button onClick={handleFilter}>Search</button>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column', mt:2}}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            autoHeight
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default ECommerceTable;