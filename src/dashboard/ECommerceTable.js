import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {useEffect, useState} from 'react';
import apiService from "../apiService/APIService";
import {CircularProgress} from "@mui/material";

function ECommerceTable() {
    const [ecommerceData, setEcommerceData] = useState([]);

    useEffect(() => {
        apiService.getECommerce()
            .then(response => setEcommerceData(response.data))
            .catch(error => console.error('Error fetching eCommerce data:', error));
    }, []);

    console.log(ecommerceData);

    if (ecommerceData.length === 0) {
        return <div><CircularProgress/><h3>Loading...</h3></div>;
    }

    // convert HashMap key and values to values only
    const convertRows = Object.values(ecommerceData);
    console.log(convertRows);

    //Convert 2D arrays [][] to array only [] because data grid rows only accept array
    const rows = convertRows.flat();
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
            <DataGrid
                rows={rows}
                columns={columns}
                autoHeight
            />
        </div>
    );
}

export default ECommerceTable;