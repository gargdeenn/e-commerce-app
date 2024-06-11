'use client';

import React, { useState, useEffect, MouseEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Typography } from '@mui/material';
import Guard from '@/app/components/guards/Guard';
import NavbarAdmin from '@/app/components/navbar/navbar-admin';

interface Empleado {
  id: int;
  email: string;
  full_name: string;
  telefono: string;
  cedula: string;
  cargo: string;
  nomina_id: number;  // Añadir un identificador único para la nómina
}

export default function VerEmpleados() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const router = useRouter();

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

  const handleVerNomina = (id_user: number) => {
    window.location.href = `/nomina?id=${id_user}`
  };

  return (
    <>
      <Guard allowedRoles={[2, 3]}>
        <NavbarAdmin />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Lista de Empleados
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>Nombre Completo</TableCell>
                        <TableCell>Teléfono</TableCell>
                        <TableCell>Cédula</TableCell>
                        <TableCell>Cargo</TableCell>
                        <TableCell>Nómina</TableCell>
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
                            <a className='text-sky-600' onClick={() => handleVerNomina(empleado.id)}>
                              Gestionar Nómina
                            </a>
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
