import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {useEffect, useState} from 'react';
import apiService from "../apiService/APIService";
import {
    Accordion, AccordionDetails,
    AccordionSummary,
    CircularProgress,
    FormControl,
    FormHelperText,
    InputAdornment,
    OutlinedInput
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import axios from "axios";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';


function ECommerceTable() {
    const [filterRecords, setFilterRecords] = useState("");
    const [searchRecords, setSearchRecords] = useState("");
    const [ecommerceData, setEcommerceData] = useState([]);

    const handleFilter = () => {
        axios
            .get(`http://localhost:8080/getAllECommerce?searchQuery=${searchRecords}&size=${filterRecords}`)
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
            <Grid container>
                <Grid item xs={9} md={9}></Grid>
                <Grid item xs={3} md={3}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <SearchIcon /><Typography>Search and Filter</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControl sx={{ m: 1}} variant="outlined">
                                <OutlinedInput
                                    id="search-records"
                                    type="text"
                                    value={searchRecords}
                                    onChange={(e) => setSearchRecords(e.target.value)}
                                    onKeyUp={handleFilter}
                                    placeholder="GLASS"
                                    endAdornment={<InputAdornment position="end"> </InputAdornment>}
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'search',
                                    }}
                                />
                                <FormHelperText id="outlined-weight-helper-text">Search records</FormHelperText>
                            </FormControl>
                            <FormControl sx={{ m: 1}} variant="outlined">
                                <OutlinedInput
                                    id="filter-records"
                                    type="text"
                                    value={filterRecords}
                                    onChange={(e) => setFilterRecords(e.target.value)}
                                    onKeyUp={handleFilter}
                                    placeholder="10000"
                                    endAdornment={<InputAdornment position="end">/ {totalNumberOfECommerce}</InputAdornment>}
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'filter',
                                    }}
                                />
                                <FormHelperText id="outlined-weight-helper-text">Filter number of records</FormHelperText>
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>
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