'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import axios from 'axios';
import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    TextField
} from '@mui/material';
import Guard from '@/app/components/guards/Guard';
import NavbarAdmin from '../../components/navbar/navbar-admin';
import StyleNomina from './view-nomina.module.css'
export interface Nomina {
    id: number;
    fecha_pago: string;
    salario_bruto: number;
    deducciones: number;
    salario_neto: number;
    id_user: number;
    // Agrega otros campos relevantes aquí
}

export default function ViewNomina() {
    const [nominaciones, setNominaciones] = useState<Nomina[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const nomina_id = searchParams.get('id');
    const [formData, setFormData] = useState({
        id: '',
        fecha_pago: '',
        salario_bruto: '',
        deducciones: '',
        salario_neto: ''
    });

    useEffect(() => {
        const fetchNominaciones = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/nomina/${nomina_id}`);
                if (res.data && res.data.length > 0) {
                    setNominaciones(res.data);
                    const data = res.data[0]; // Asumiendo que quieres mostrar la primera nómina en los campos del formulario
                    setFormData({
                        id: data.id.toString(),
                        fecha_pago: data.fecha_pago,
                        salario_bruto: data.salario_bruto.toString(),
                        deducciones: data.deducciones.toString(),
                        salario_neto: data.salario_neto.toString()
                    });
                }
            } catch (error) {
                console.error('Error al obtener las nóminas:', error);
            }
        };

        if (nomina_id) {
            fetchNominaciones();
        }
    }, [nomina_id]);

    const handleCrearNomina = async () => {
        const salarioBruto = parseFloat(formData.salario_bruto);
        const deducciones = parseFloat(formData.deducciones);
        const salarioNeto = salarioBruto - deducciones;

        const payload = {
            fecha_pago: formData.fecha_pago,
            salario_bruto: salarioBruto,
            deducciones: deducciones,
            salario_neto: salarioNeto,
            id_user: parseInt(nomina_id as string) // Asumiendo que `nomina_id` representa `id_user`
        };

        try {
            const res = await axios.post('http://localhost:8000/nomina/', payload);
            alert('Nómina creada:', res.data);
            window.location.reload();
        } catch (error) {
            alert('Error al crear la nómina:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <Guard allowedRoles={[2, 3]}>
            <NavbarAdmin />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Detalles de las Nóminas
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Fecha de Pago</TableCell>
                                    <TableCell>Salario Bruto</TableCell>
                                    <TableCell>Deducciones</TableCell>
                                    <TableCell>Salario Neto</TableCell>
                                    <TableCell>Pagar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {nominaciones.map((nomina) => (
                                    <TableRow key={nomina.id}>
                                        <TableCell>{nomina.id}</TableCell>
                                        <TableCell>{nomina.fecha_pago}</TableCell>
                                        <TableCell>{nomina.salario_bruto}</TableCell>
                                        <TableCell>{nomina.deducciones}</TableCell>
                                        <TableCell>{nomina.salario_neto}</TableCell>
                                        <TableCell>
                                            <button className={StyleNomina.done}>Pagar</button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <br />
                    <Button variant="contained" color="primary" onClick={() => router.back()}>
                        Volver
                    </Button>
                </Paper>
                <Paper sx={{ p: 2, mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Crear Nómina
                    </Typography>
                    <TextField
                        label="Fecha de Pago"
                        type="date"
                        name="fecha_pago"
                        value={formData.fecha_pago}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        margin="normal" />
                    <TextField
                        label="Salario Bruto"
                        type="text"
                        name="salario_bruto"
                        value={formData.salario_bruto}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal" />
                    <TextField
                        label="Deducciones"
                        type="text"
                        name="deducciones"
                        value={formData.deducciones}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal" />
                    <Button variant="contained" color="primary" onClick={handleCrearNomina}>
                        Crear Nómina
                    </Button>
                </Paper>
            </Box>
        </Guard>
    );
}
