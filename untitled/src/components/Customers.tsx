import  { useEffect, useState } from 'react';
import React from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const Customers: React.FC = () => {
    const [customers, setCustomers] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/CUSTOMER-SERVICE/customers?projection=customerProj1")
            .then(response => setCustomers(response.data._embedded.customers))
            .catch(error => console.error(error));
    }, []);

    const handleGetBills = (id: number) => {
        navigate(`/bills/${id}`);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers.map(customer => (
                        <TableRow key={customer.id}>
                            <TableCell>{customer.id}</TableCell>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => handleGetBills(customer.id)}>
                                    Bills
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Customers;