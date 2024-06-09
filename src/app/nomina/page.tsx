'use client';

import React, { useState, useEffect, MouseEvent } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
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
  Typography,
  Button,
  TextField
} from '@mui/material';
import Guard from '@/app/components/guards/Guard';
import NavbarAdmin from '../components/navbar/navbar-admin';
import StyleDashboard from './nomina.module.css';

interface Empleado {
  id:number;
  email: string;
  full_name: string;
  telefono: string;
  cedula: string;
  cargo: string;
  nomina_id: number;
}

export default function VerEmpleados() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [formData, setFormData] = useState({
    fecha_pago: '',
    salario_bruto: 0,
    deducciones: 0,
    salario_neto: 0
  });
  

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const res = await axios.get('http://localhost:8000/users/');
        setEmpleados(res.data);
      } catch (error) {
        console.error('Error al obtener los empleados:', error);
      }
    };
    fetchEmpleados();
  }, []);

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleVerNomina = (nomina_id: number) => {
    window.location.href = `/dashboard/view-nomina?id=${nomina_id}`
  };

  const handleDespedirEmpleado = (id_user: number) => {
    router.push(`/despedir/${id_user}`);
  };


  return (
    <>
      <Guard allowedRoles={[2, 3]}>
        <NavbarAdmin />
        <Box sx={{ flexGrow: 1, p: 5 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 5 }}>
                <Typography variant="h6" gutterBottom>
                  Lista de Empleados
                </Typography>
                <br />
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>Nombre Completo</TableCell>
                        <TableCell>Teléfono</TableCell>
                        <TableCell>Cédula</TableCell>
                        <TableCell>Cargo</TableCell>
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {empleados.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((empleado, index) => (
                        <TableRow key={index}>
                          <TableCell>{empleado.email}</TableCell>
                          <TableCell>{empleado.full_name}</TableCell>
                          <TableCell>{empleado.telefono}</TableCell>
                          <TableCell>{empleado.cedula}</TableCell>
                          <TableCell>{empleado.cargo}</TableCell>
                          <TableCell>
                            <button className={StyleDashboard.enviar} onClick={() => handleVerNomina(empleado.id)}>
                              Ver Nómina
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={empleados.length}
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
