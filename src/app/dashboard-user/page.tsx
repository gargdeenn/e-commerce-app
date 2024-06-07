'use client';

import React, { useState } from 'react';
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField, Typography, IconButton, Button, SvgIcon } from '@mui/material';
import Guard from '../components/guards/Guard';

export default function PedidoDashboard() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');

  const initialProductos = [
    { nombre: 'Producto 1', precio: 100 },
    { nombre: 'Producto 2', precio: 150 },
    { nombre: 'Producto 3', precio: 200 },
    { nombre: 'Producto 4', precio: 250 },
    { nombre: 'Producto 5', precio: 300 }
  ];

  const [productos, setProductos] = useState(initialProductos);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const removeProduct = (nombre) => {
    setProductos(productos.filter(producto => producto.nombre !== nombre));
  };

  const filteredProductos = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Guard allowedRoles={[1]}>
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Productos
                </Typography>
                <TextField
                  label="Buscar"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={handleSearch}
                />
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Precio</TableCell>
                        <TableCell>Acción</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredProductos
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((producto) => (
                          <TableRow key={producto.nombre}>
                            <TableCell>{producto.nombre}</TableCell>
                            <TableCell>${producto.precio}</TableCell>
                            <TableCell>
                              <IconButton color="secondary" onClick={() => removeProduct(producto.nombre)}>
                                <SvgIcon>
                                  <path d="M3 6l3 18h12l3-18H3zm15 16H6l-2.5-15h17L18 22zM15 4V2H9v2H4v2h16V4h-5z" />
                                </SvgIcon>
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filteredProductos.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Button variant="contained" color="primary" size="large">
                    Finalizar Pedido
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Guard>
    </>
  );
}
