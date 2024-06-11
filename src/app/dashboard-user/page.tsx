'use client';

import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Necesario para la navegación
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField, Typography, Button } from '@mui/material';
import Guard from '../components/guards/Guard';
import StyleDashboard from './dashboard-user.module.css';

interface Producto {
  id: string;
  nombre: string;
  precio_unitario: number;
  cantidad: number;
}

interface Categoria {
  categoria: string;
  total_vendido: number;
}

export default function PedidoDashboard() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const router = useRouter(); // Inicializar el router para la navegación

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const fetchedProductos = await Promise.all(cartItems.map(async (id: string) => {
        const res = await axios.get(`http://localhost:8000/productos/${id}`);
        return { ...res.data.producto, id, cantidad: 1 };
      }));
      setProductos(fetchedProductos);
    };

    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:8000/categorias-total-vendido');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCartItems();
    fetchCategorias();
  }, []);

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const removeProduct = (id: string) => {
    setProductos(productos.filter(producto => producto.id !== id));
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]').filter((itemId: string) => itemId !== id);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  const incrementQuantity = (id: string) => {
    setProductos(productos.map(producto =>
      producto.id === id ? { ...producto, cantidad: producto.cantidad + 1 } : producto
    ));
  };

  const decrementQuantity = (id: string) => {
    setProductos(productos.map(producto =>
      producto.id === id && producto.cantidad > 0 ? { ...producto, cantidad: producto.cantidad - 1 } : producto
    ));
  };

  const handleSubmitOrder = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // Asegúrate de que el user esté almacenado en localStorage o de otra forma obtenlo
    if (!user.email) {
      alert('Usuario no autenticado');
      return;
    }

    const orderItems = productos.map(producto => ({ id_producto: producto.id, cantidad: producto.cantidad, precio_unitario: producto.precio_unitario, sub_total: total}));
    const payload = {
      pedido: orderItems,
      email: user.email
    }
    try {
      const response = await axios.post('http://localhost:8000/pedidos/', payload);
      if (response.status === 201) {
        alert('Pedido realizado con éxito');
        // Limpiar carrito
        localStorage.removeItem('cartItems');
        router.push('/view-pedidos'); 
        setProductos([]);
      } else {
        alert('Error al realizar el pedido');
      }
    } catch (error) {
      console.error('Error al realizar el pedido:', error);
      alert('Error al realizar el pedido');
    }
  };

  const handleViewPedidos = () => {
    router.push('/view-pedidos'); // Navegar a la página de pedidos
  };

  const filteredProductos = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const total = productos.reduce((acc, producto) => acc + (producto.precio_unitario * producto.cantidad), 0);

  return (
    <>
      <Guard allowedRoles={[1]}>
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={8}>
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
                        <TableCell>Cantidad</TableCell>
                        <TableCell>Acción</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredProductos
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((producto) => (
                          <TableRow key={producto.id}>
                            <TableCell>{producto.nombre}</TableCell>
                            <TableCell>${producto.precio_unitario}</TableCell>
                            <TableCell>
                              <div className={StyleDashboard.input}>
                                <button className={StyleDashboard.decrement} onClick={() => decrementQuantity(producto.id)}>-</button>
                                <span className={StyleDashboard.cantidad}>{producto.cantidad}</span>
                                <button className={StyleDashboard.increment} onClick={() => incrementQuantity(producto.id)}>+</button>
                              </div>
                            </TableCell>
                            <TableCell>
                              <button className={StyleDashboard.remove} onClick={() => removeProduct(producto.id)}>Eliminar</button>
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
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Resumen del Pedido
                </Typography>
                <Typography variant="subtitle1">
                  Total: ${total}
                </Typography>
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Button variant="contained" color="primary" size="large" onClick={handleSubmitOrder}>
                    Finalizar Pedido
                  </Button>
                </Box>
              </Paper>
              <Paper sx={{ p: 2, mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Categorías y Ventas Totales
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Categoría</TableCell>
                        <TableCell>Total Vendido</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {categorias.map((categoria) => (
                        <TableRow key={categoria.categoria}>
                          <TableCell>{categoria.categoria}</TableCell>
                          <TableCell>${categoria.total_vendido}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Button variant="contained" color="secondary" size="large" onClick={handleViewPedidos}>
                    Ver Mis Pedidos
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
