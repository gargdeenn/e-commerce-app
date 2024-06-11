'use client';

import React, { useState, useEffect, MouseEvent } from 'react';
import axios from 'axios';
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Typography, Button } from '@mui/material';
import Guard from '../components/guards/Guard';
import StyleDashboard from './dashboard-user.module.css';

interface Producto {
  nombre: string;
  descripcion: string;
  precio_unitario: number;
  categoria: string;
  imagen: string;
}

interface DetallePedido {
  cantidad: number;
  precio_unitario: number;
  sub_total: number;
  id_producto: number;
  producto: Producto;
}

interface Pedido {
  fecha_pedido: string;
  estado: string;
  total: number | null;
  pedido: DetallePedido[];
}

export default function MisPedidos() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      const formDataObj = new FormData();
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      formDataObj.append('email', user.email);
      if (user.email) {
        const res = await axios.post(`http://localhost:8000/pedidos/search/`, formDataObj);
        setPedidos(res.data);
      }
    };
    fetchPedidos();
  }, []);

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCancelPedido = async (index: number) => {
    try {
      const pedido = pedidos[index];
      // Asegúrate de que el pedido tenga un identificador único que el backend pueda usar para eliminarlo
      
      setPedidos(pedidos.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error al cancelar el pedido:', error);
    }
  };

  return (
    <>
      <Guard allowedRoles={[1]}>
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Mis Pedidos
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Detalles</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pedidos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pedido, index) => (
                        <TableRow key={index}>
                          <TableCell>{pedido.fecha_pedido}</TableCell>
                          <TableCell>{pedido.estado}</TableCell>
                          <TableCell>${pedido.total !== null ? pedido.total : 'Calculando'}</TableCell>
                          <TableCell>
                            <div>
                              {pedido.pedido.map((detalle, i) => (
                                <div key={i} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                                  <p><strong>Producto:</strong> {detalle.producto.nombre}</p>
                                  <p><strong>Descripción:</strong> {detalle.producto.descripcion}</p>
                                  <p><strong>Cantidad:</strong> {detalle.cantidad}</p>
                                  <p><strong>Precio Unitario:</strong> ${detalle.precio_unitario}</p>
                                  <p><strong>Subtotal:</strong> ${detalle.sub_total}</p>
                                </div>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={pedidos.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Guard>
    </>
  );
}
