'use client';

import React, { useState, useEffect, MouseEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import Guard from '@/app/components/guards/Guard';
import NavbarAdmin from '@/app/components/navbar/navbar-admin';
import StyleViewDespedidos from './view-despedidos.module.css';

interface EmpleadoDespedido {
  id: number;
  fecha: string;
  motivo: string;
  id_user: number;
  comentarios: string;
}

export default function VerEmpleadosDespedidos() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [empleadosDespedidos, setEmpleadosDespedidos] = useState<EmpleadoDespedido[]>([]);
  const [filteredEmpleados, setFilteredEmpleados] = useState<EmpleadoDespedido[]>([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState<EmpleadoDespedido | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEmpleadosDespedidos = async () => {
      try {
        const res = await axios.get('http://localhost:8000/despido/');
        setEmpleadosDespedidos(res.data);
        setFilteredEmpleados(res.data);
      } catch (error) {
        console.error('Error al obtener los empleados despedidos:', error);
      }
    };
    fetchEmpleadosDespedidos();
  }, []);

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (empleado: EmpleadoDespedido) => {
    setSelectedEmpleado(empleado);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedEmpleado(null);
  };

  const handleRecontratarEmpleado = async () => {
    if (selectedEmpleado) {
      try {
        const res = await axios.post(`http://localhost:8000/recontratar/${selectedEmpleado.id_user}`);
        if (res.status == 200) {
          alert('Empleado recontratado!!');
          setEmpleadosDespedidos(empleadosDespedidos.filter(e => e.id !== selectedEmpleado.id));
          setFilteredEmpleados(filteredEmpleados.filter(e => e.id !== selectedEmpleado.id));
        }
      } catch (error) {
        console.error('Error al recontratar el empleado:', error);
      }
      handleCloseModal();
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    const filtered = empleadosDespedidos.filter(empleado => empleado.motivo.toLowerCase().includes(value.toLowerCase()));
    setFilteredEmpleados(filtered);
    setPage(0);
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
                  Lista de Empleados Despedidos
                </Typography>
                <TextField
                  label="Buscar por motivo"
                  variant="outlined"
                  value={search}
                  onChange={handleSearchChange}
                  fullWidth
                  margin="normal"
                />
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Motivo</TableCell>
                        <TableCell>ID Usuario</TableCell>
                        <TableCell>Comentarios</TableCell>
                        <TableCell>Recontratar</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredEmpleados.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((empleado, index) => (
                        <TableRow key={empleado.id}>
                          <TableCell>{empleado.id}</TableCell>
                          <TableCell>{empleado.fecha}</TableCell>
                          <TableCell>{empleado.motivo}</TableCell>
                          <TableCell>{empleado.id_user}</TableCell>
                          <TableCell>{empleado.comentarios}</TableCell>
                          <TableCell>
                            <button className={StyleViewDespedidos.done} onClick={() => handleOpenModal(empleado)}>
                              Recontratar
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
                  count={filteredEmpleados.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </Grid>
          </Grid>
        </Box>
        <Dialog open={open} onClose={handleCloseModal}>
          <DialogTitle>Confirmar Recontratación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Estás seguro de que deseas recontratar al empleado {selectedEmpleado?.id_user}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button onClick={handleCloseModal} className={StyleViewDespedidos.remove}>
              Cancelar
            </button>
            <button onClick={handleRecontratarEmpleado} className={StyleViewDespedidos.done}>
              Recontratar
            </button>
          </DialogActions>
        </Dialog>
      </Guard>
    </>
  );
}
