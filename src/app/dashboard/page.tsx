'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

import Guard from '../components/guards/Guard';
import NavbarAdmin from '../components/navbar/navbar-admin';

export default function Dashboard() {
  const [pageBuscados, setPageBuscados] = useState(0);
  const [rowsPerPageBuscados, setRowsPerPageBuscados] = useState(5);
  const [searchBuscados, setSearchBuscados] = useState('');

  const [pageReponer, setPageReponer] = useState(0);
  const [rowsPerPageReponer, setRowsPerPageReponer] = useState(5);
  const [searchReponer, setSearchReponer] = useState('');

  const [pageNomina, setPageNomina] = useState(0);
  const [rowsPerPageNomina, setRowsPerPageNomina] = useState(5);
  const [searchNomina, setSearchNomina] = useState('');

  const [postulantesPorMes, setPostulantesPorMes] = useState({
    labels: [],
    datasets: []
  });

  const [gananciasMensuales, setGananciasMensuales] = useState({
    labels: [],
    datasets: []
  });

  const [categoriasProductos, setCategoriasProductos] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: []
      }
    ]
  });

  useEffect(() => {
    const fetchPostulantes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/dashboard/');
        setPostulantesPorMes(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchGanancias = async () => {
      try {
        const response = await axios.get('http://localhost:8000/dashboard/lineal/');
        setGananciasMensuales(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchCategoriasProductos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/dashboard/circular/');
        const categoriasData = response.data;

        const labels = categoriasData.map(item => item.categoria);
        const data = categoriasData.map(item => item.total_vendido);
        const backgroundColor = ['#FF6384', '#36A2EB', '#FFCE56'];
        const hoverBackgroundColor = ['#FF6384', '#36A2EB', '#FFCE56'];

        setCategoriasProductos({
          labels,
          datasets: [
            {
              data,
              backgroundColor,
              hoverBackgroundColor
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPostulantes();
    fetchGanancias();
    fetchCategoriasProductos();
  }, []);

  const productosMasVendidos = {
    labels: [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    datasets: [
      {
        label: 'Producto A',
        data: [0, 0, 0, 0, 0, 55, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'Producto B',
        data: [0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  const productosMasBuscados = [
    { nombre: 'Producto 1', vecesBuscado: 50 },
    { nombre: 'Producto 2', vecesBuscado: 40 },
    { nombre: 'Producto 3', vecesBuscado: 30 },
    { nombre: 'Producto 4', vecesBuscado: 20 },
    { nombre: 'Producto 5', vecesBuscado: 10 }
  ];

  const productosPorReponer = [
    { nombre: 'Producto 1', cantidadTotal: 100, cantidadVendida: 90, totalReponer: 10 },
    { nombre: 'Producto 2', cantidadTotal: 150, cantidadVendida: 140, totalReponer: 10 },
    { nombre: 'Producto 3', cantidadTotal: 200, cantidadVendida: 180, totalReponer: 20 }
  ];

  const empleadosNomina = [
    { nombre: 'Empleado 1', nomina: 3000 },
    { nombre: 'Empleado 2', nomina: 2500 },
    { nombre: 'Empleado 3', nomina: 2000 }
  ];

  const totalGananciasMesActual = 1200;
  const totalGananciasAnoActual = 36000;

  const handleChangePageBuscados = (event, newPage) => {
    setPageBuscados(newPage);
  };

  const handleChangeRowsPerPageBuscados = (event) => {
    setRowsPerPageBuscados(parseInt(event.target.value, 10));
    setPageBuscados(0);
  };

  const handleSearchBuscados = (event) => {
    setSearchBuscados(event.target.value);
  };

  const handleChangePageReponer = (event, newPage) => {
    setPageReponer(newPage);
  };

  const handleChangeRowsPerPageReponer = (event) => {
    setRowsPerPageReponer(parseInt(event.target.value, 10));
    setPageReponer(0);
  };

  const handleSearchReponer = (event) => {
    setSearchReponer(event.target.value);
  };

  const handleChangePageNomina = (event, newPage) => {
    setPageNomina(newPage);
  };

  const handleChangeRowsPerPageNomina = (event) => {
    setRowsPerPageNomina(parseInt(event.target.value, 10));
    setPageNomina(0);
  };

  const handleSearchNomina = (event) => {
    setSearchNomina(event.target.value);
  };

  const filteredBuscados = productosMasBuscados.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchBuscados.toLowerCase())
  );

  const filteredReponer = productosPorReponer.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchReponer.toLowerCase())
  );

  const filteredNomina = empleadosNomina.filter((empleado) =>
    empleado.nombre.toLowerCase().includes(searchNomina.toLowerCase())
  );

  return (
    <>
      <Guard allowedRoles={[2, 3]}>
        <NavbarAdmin />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Postulantes por Mes
                </Typography>
                <Bar data={postulantesPorMes} options={{ responsive: true }} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Ganancias Mensuales
                </Typography>
                <Bar data={gananciasMensuales} options={{ responsive: true }} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Categorías de Productos
                </Typography>
                <Box sx={{ height: '300px' }}>
                  <Pie data={categoriasProductos} options={{ responsive: true, maintainAspectRatio: false }} />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Productos Más Vendidos
                </Typography>
                <Bar data={productosMasVendidos} options={{ responsive: true }} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Productos Más Buscados
                </Typography>
                <TextField
                  label="Buscar"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={handleSearchBuscados}
                />
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Número de Veces Buscado</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredBuscados
                        .slice(pageBuscados * rowsPerPageBuscados, pageBuscados * rowsPerPageBuscados + rowsPerPageBuscados)
                        .map((producto) => (
                          <TableRow key={producto.nombre}>
                            <TableCell>{producto.nombre}</TableCell>
                            <TableCell>{producto.vecesBuscado}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filteredBuscados.length}
                  rowsPerPage={rowsPerPageBuscados}
                  page={pageBuscados}
                  onPageChange={handleChangePageBuscados}
                  onRowsPerPageChange={handleChangeRowsPerPageBuscados}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Productos por Reponer
                </Typography>
                <TextField
                  label="Buscar"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={handleSearchReponer}
                />
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Cantidad Total</TableCell>
                        <TableCell>Cantidad Vendida</TableCell>
                        <TableCell>Total a Reponer</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredReponer
                        .slice(pageReponer * rowsPerPageReponer, pageReponer * rowsPerPageReponer + rowsPerPageReponer)
                        .map((producto) => (
                          <TableRow key={producto.nombre}>
                            <TableCell>{producto.nombre}</TableCell>
                            <TableCell>{producto.cantidadTotal}</TableCell>
                            <TableCell>{producto.cantidadVendida}</TableCell>
                            <TableCell>{producto.totalReponer}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filteredReponer.length}
                  rowsPerPage={rowsPerPageReponer}
                  page={pageReponer}
                  onPageChange={handleChangePageReponer}
                  onRowsPerPageChange={handleChangeRowsPerPageReponer}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Resumen de Ganancias
                </Typography>
                <Typography variant="body1">Ganancias del Mes Actual</Typography>
                <Typography variant="h4">${totalGananciasMesActual}</Typography>
                <Typography variant="body1">Ganancias del Año</Typography>
                <Typography variant="h4">${totalGananciasAnoActual}</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Guard>
    </>
  );
}
