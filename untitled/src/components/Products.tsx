import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';

const Products: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        axios.get("http://localhost:8080/INVENTORY-SERVICE/products?projection=p1")
            .then(response => setProducts(response.data._embedded.products))
            .catch(error => console.error(error));
    }, []);

    const handleSearch = () => {
        axios.get(`http://localhost:8080/INVENTORY-SERVICE/products/search/byName?keyword=${searchKeyword}`)
            .then(response => setProducts(response.data))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <TextField
                label="Search by Name"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
                Search
            </Button>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map(product => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Products;