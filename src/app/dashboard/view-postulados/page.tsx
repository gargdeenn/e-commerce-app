'use client';

import React, { useState, useEffect, MouseEvent } from 'react';
import axios from 'axios';
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Typography, Button } from '@mui/material';
import StyleDashboard from './dashboard-user.module.css';
import Guard from '@/app/components/guards/Guard';
import NavbarAdmin from '@/app/components/navbar/navbar-admin';

interface Postulante {
  nombre: string;
  email: string;
  telefono: string;
  cv: string;
  carta_presentacion: string;
}

export default function VerPostulantes() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [postulantes, setPostulantes] = useState<Postulante[]>([]);

  useEffect(() => {
    const fetchPostulantes = async () => {
      const formDataObj = new FormData();
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      formDataObj.append('email', user.email);
      if (user.email) {
        const res = await axios.get(`http://localhost:8000/postular/`);
        setPostulantes(res.data);
      }
    };
    fetchPostulantes();
  }, []);

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
                  Postulantes a la Vacante
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Teléfono</TableCell>
                        <TableCell>CV</TableCell>
                        <TableCell>Carta de Presentación</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {postulantes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((postulante, index) => (
                        <TableRow key={index}>
                          <TableCell>{postulante.nombre}</TableCell>
                          <TableCell>{postulante.email}</TableCell>
                          <TableCell>{postulante.telefono}</TableCell>
                          <TableCell>
                            <a className='text-sky-600' href={`http://localhost:8000/${postulante.cv}`} target="_blank" rel="noopener noreferrer">
                              Ver CV
                            </a>
                          </TableCell>
                          <TableCell>
                            <a className='text-sky-600' href={`http://localhost:8000/${postulante.carta_presentacion}`} target="_blank" rel="noopener noreferrer">
                              Ver Carta de Presentación
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
                  count={postulantes.length}
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
