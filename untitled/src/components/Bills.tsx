import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const Bills: React.FC = () => {
    const [bills, setBills] = useState<any[]>([]);
    const { customerId } = useParams<{ customerId: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/BILLING-SERVICE/bills/search/billsByCustomerId?projection=billProj1&id=${customerId}`)
            .then(response => setBills(response.data._embedded.bills))
            .catch(error => console.error(error));
    }, [customerId]);

    const handleBillDetails = (id: number) => {
        navigate(`/bill-details/${id}`);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>CustomerID</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bills.map(bill => (
                        <TableRow key={bill.id}>
                            <TableCell>{bill.id}</TableCell>
                            <TableCell>{bill.createdAt}</TableCell>
                            <TableCell>{bill.customerId}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => handleBillDetails(bill.id)}>
                                    Details
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Bills;