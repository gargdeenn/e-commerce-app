'use client';

import React, { useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Typography
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

  const postulantesPorMes = {
    labels: [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    datasets: [
      {
        label: 'Número de Postulantes',
        data: [12, 19, 3, 5, 2, 3, 10, 8, 12, 15, 10, 7],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const categoriasProductos = {
    labels: ['Hogar', 'Electrónica', 'Moda', 'Juguetes', 'Deportes'],
    datasets: [
      {
        data: [300, 50, 100, 40, 120],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#36A2EB'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#36A2EB'
        ]
      }
    ]
  };

  const productosMasVendidos = {
    labels: [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    datasets: [
      {
        label: 'Producto A',
        data: [65, 59, 80, 81, 56, 55, 40, 42, 58, 64, 55, 40],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'Producto B',
        data: [28, 48, 40, 19, 86, 27, 90, 84, 40, 50, 35, 20],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  const gananciasMensuales = {
    labels: [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    datasets: [
      {
        label: 'Ganancias',
        data: [1200, 1900, 3000, 5000, 2000, 3000, 4000, 4500, 3000, 2000, 1500, 1200],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)'
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
                  Ganancias Mensuales
                </Typography>
                <Line data={gananciasMensuales} options={{ responsive: true }} />
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
                  Nómina de Empleados
                </Typography>
                <TextField
                  label="Buscar"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={handleSearchNomina}
                />
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Nómina</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredNomina
                        .slice(pageNomina * rowsPerPageNomina, pageNomina * rowsPerPageNomina + rowsPerPageNomina)
                        .map((empleado) => (
                          <TableRow key={empleado.nombre}>
                            <TableCell>{empleado.nombre}</TableCell>
                            <TableCell>${empleado.nomina}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filteredNomina.length}
                  rowsPerPage={rowsPerPageNomina}
                  page={pageNomina}
                  onPageChange={handleChangePageNomina}
                  onRowsPerPageChange={handleChangeRowsPerPageNomina}
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
