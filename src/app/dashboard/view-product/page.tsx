'use client'
import React, { useState, useEffect } from 'react';
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
    Modal,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TablePagination
} from '@mui/material';
import Guard from '@/app/components/guards/Guard';
import NavbarAdmin from '../../components/navbar/navbar-admin';
import StyleDashboard from './view-product.module.css';

export default function ProductosTable() {
    const [productos, setProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio_unitario: '',
        categoria: '',
        cantidad: ''
    });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8000/productos'); // Asegúrate de que la URL sea correcta
                setProductos(res.data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProducts = productos.filter((item) =>
        item.producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleOpenEditModal = (product) => {
        setSelectedProduct(product);
        setFormData({
            nombre: product.producto.nombre,
            descripcion: product.producto.descripcion,
            precio_unitario: product.producto.precio_unitario,
            categoria: product.producto.categoria,
            cantidad: product.inventario.cantidad
        });
        setOpenEditModal(true);
    };

    const handleOpenDeleteModal = (product) => {
        setSelectedProduct(product);
        setOpenDeleteModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedProduct(null);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
        setSelectedProduct(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEdit = async () => {
        const payload = {
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            precio_unitario: formData.precio_unitario,
            categoria: formData.categoria,
            cantidad: formData.cantidad
        };

        try {
            const response = await axios.put(`http://localhost:8000/productos/${selectedProduct.producto.id}`, payload);
            if (response.status === 200) {
                window.location.reload();
            }
            handleCloseEditModal();
        } catch (error) {
            alert('Error al editar el producto:', error);
        }
    };

    return (
        <Guard allowedRoles={[2, 3]}>
            <NavbarAdmin />
            <Box sx={{ flexGrow: 1, p: 5 }}>
                <Paper sx={{ p: 5 }}>
                    <Typography variant="h6" gutterBottom>
                        Lista de Productos
                    </Typography>
                    <TextField
                        label="Buscar producto"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        fullWidth
                        margin="normal"
                    />
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>NOMBRE</TableCell>
                                    <TableCell>DESCRIPCIÓN</TableCell>
                                    <TableCell>PRECIO UNITARIO</TableCell>
                                    <TableCell>CATEGORÍA</TableCell>
                                    <TableCell>PROVEEDOR</TableCell>
                                    <TableCell>CANTIDAD EN INVENTARIO</TableCell>
                                    <TableCell>EDITAR</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                                    <TableRow key={item.producto.id}>
                                        <TableCell>{item.producto.nombre}</TableCell>
                                        <TableCell>{item.producto.descripcion}</TableCell>
                                        <TableCell>{item.producto.precio_unitario}</TableCell>
                                        <TableCell>{item.producto.categoria}</TableCell>
                                        <TableCell>{item.proveedor.nombre_proveedor}</TableCell>
                                        <TableCell>{item.inventario.cantidad}</TableCell>
                                        <TableCell>
                                            <button
                                                color="primary"
                                                className={StyleDashboard.edit}
                                                onClick={() => handleOpenEditModal(item)}
                                            >
                                                Editar
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
                        count={filteredProducts.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>

            <Modal
                open={openEditModal}
                onClose={handleCloseEditModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4
                }}>
                    <Typography variant="h6" gutterBottom>
                        Editar Producto
                    </Typography>
                    <TextField
                        label="Nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Descripción"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Precio Unitario"
                        name="precio_unitario"
                        type="number"
                        value={formData.precio_unitario}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <select
                        id="categoria"
                        name="categoria"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                        value={formData.categoria}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una categoría</option>
                        <option value="Electronica">Electrónica</option>
                        <option value="Hogar">Hogar</option>
                        <option value="Moda">Moda</option>
                        <option value="Deportes">Deportes</option>
                        <option value="Juguetes">Juguetes</option>
                    </select>
                    <TextField
                        label="Cantidad en Inventario"
                        name="cantidad"
                        type="number"
                        value={formData.cantidad}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <button color="primary" className={StyleDashboard.enviar} onClick={handleEdit}>
                            Guardar
                        </button>
                        <button color="secondary" className={StyleDashboard.remove} onClick={handleCloseEditModal} sx={{ ml: 2 }}>
                            Cancelar
                        </button>
                    </Box>
                </Box>
            </Modal>
        </Guard>
    );
}
