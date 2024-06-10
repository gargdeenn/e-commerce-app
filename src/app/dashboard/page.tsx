'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
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
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
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

  const [postulantesPorMes, setPostulantesPorMes] = useState({
    labels: [],
    datasets: []
  });

  const [gananciasMensuales, setGananciasMensuales] = useState({
    labels: [],
    datasets: []
  });
  
  const [ProductosMasBuscados, setProductosMasBuscados] = useState({
    terms: '',
    count: 0
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

  const [productosMasVendidos, setProductosMasVendidos] = useState({
    labels: [],
    datasets: [
      {
        label: 'Productos Más Vendidos',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  });

  const [totalGananciasMesActual, setTotalGananciasMesActual] = useState(0);
  const [totalGananciasMesActualEnd, setTotalGananciasMesActualEnd] = useState(0);
  const [totalGananciasAnoActual, setTotalGananciasAnoActual] = useState(0);  // This should ideally be fetched from the backend too

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
        const data = response.data;
        setGananciasMensuales(response.data);
        const gananciasMensuales = data.datasets[0].data;
        const mesActual = new Date().getMonth();
        const gananciasMesActual = gananciasMensuales[mesActual];
        console.log(`Ganancias del mes actual (${data.labels[mesActual]}): ${gananciasMesActual}`);
        const totalGananciasAnuales = gananciasMensuales.reduce((total, ganancia) => total + ganancia, 0);
        console.log(`Total de ganancias anuales: ${totalGananciasAnuales}`);
        setTotalGananciasMesActualEnd(gananciasMesActual);
        setTotalGananciasAnoActual(totalGananciasAnuales);
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

    const fetchProductosMasVendidos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/dashboard/barras/');
        const productosData = response.data;
        const meses = [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        const dataPorMes = Array(12).fill(0); // Inicializar un array de 12 elementos en 0

        productosData.forEach(item => {
          dataPorMes[item.mes - 1] = item.cantidad_maxima; // Asignar la cantidad en el mes correspondiente
        });

        setProductosMasVendidos({
          labels: meses,
          datasets: [
            {
              label: productosData[0].nombre_producto,
              data: dataPorMes,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchGananciasActuales = async () => {
      try {
        const response = await axios.get('http://localhost:8000/dashboard/ganancias-actuales/');
        const gananciasData = response.data;
        setTotalGananciasMesActual(gananciasData.mes_actual);
        setTotalGananciasAnoActual(gananciasData.ano_actual);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchProductosMasBuscados = async () => {
      try {
        const response = await axios.get('http://localhost:8000/dashboard/terms/');
        setProductosMasBuscados({
          terms: response.data.term,
          count: response.data.count
        });
        for (let index = 0; index < response.data.length; index++) {
          console.log(response.data[index])//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPostulantes();
    fetchGanancias();
    fetchCategoriasProductos();
    fetchProductosMasVendidos();
    fetchGananciasActuales();
    fetchProductosMasBuscados();
  }, []);

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

  const handleChangePageBuscados = (newPage: number) => {
    setPageBuscados(newPage);
  };

  const handleChangeRowsPerPageBuscados = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPageBuscados(parseInt(event.target.value, 10));
    setPageBuscados(0);
  };

  const handleSearchBuscados = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchBuscados(event.target.value);
  };

  const handleChangePageReponer = (newPage: number) => {
    setPageReponer(newPage);
  };

  const handleChangeRowsPerPageReponer = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPageReponer(parseInt(event.target.value, 10));
    setPageReponer(0);
  };

  const handleSearchReponer = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchReponer(event.target.value);
  };

  const filteredBuscados = productosMasBuscados.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchBuscados.toLowerCase())
  );

  const filteredReponer = productosPorReponer.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchReponer.toLowerCase())
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
                            <TableCell>{ProductosMasBuscados.terms}</TableCell>
                            <TableCell>{ProductosMasBuscados.count}</TableCell>
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
                <Typography variant="h4">${totalGananciasMesActualEnd}</Typography>
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
