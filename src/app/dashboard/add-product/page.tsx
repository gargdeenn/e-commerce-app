'use client';
import NavbarAdmin from '@/app/components/navbar/navbar-admin'
import { PhotoIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProduct() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        nombre: '',
        precio_unitario: '',
        descripcion: '',
        categoria: '',
        nombre_proveedor: '',
        nit: '',
        direccion: '',
        telefono: '',
        cantidad: '',
        ubicacion: '',
        fecha: '',
        fecha_actualizacion: '',
        estadoStock: ''
    });
    const [file, setFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // const payload = {
        //     producto: {
        //         nombre: formData.nombre,
        //         precio_unitario: formData.precio_unitario,
        //         descripcion: formData.descripcion,
        //         categoria: formData.categoria
        //     },
        //     proveedor: {
        //         nombre_proveedor: formData.nombre_proveedor,
        //         nit: formData.nit,
        //         direccion: formData.direccion,
        //         telefono: formData.telefono
        //     },
        //     inventario: {
        //         cantidad: formData.cantidad,
        //         ubicacion: formData.ubicacion,
        //         fecha: formData.fecha,
        //         fecha_actualizacion: formData.fecha_actualizacion,
        //         estado_stock: formData.estadoStock
        //     }
        // };

        try {
            const formDataObj = new FormData();
            // formDataObj.append('data', JSON.stringify(payload));
            formDataObj.append('nombre', formData.nombre);
            formDataObj.append('precio_unitario', formData.precio_unitario);
            formDataObj.append('descripcion', formData.descripcion);
            formDataObj.append('categoria', formData.categoria);
            formDataObj.append('nombre_proveedor', formData.nombre_proveedor);
            formDataObj.append('nit', formData.nit);
            formDataObj.append('direccion', formData.direccion);
            formDataObj.append('telefono', formData.telefono);
            formDataObj.append('cantidad', formData.cantidad);
            formDataObj.append('ubicacion', formData.ubicacion);
            formDataObj.append('fecha', formData.fecha);
            formDataObj.append('fecha_actualizacion', formData.fecha_actualizacion);
            formDataObj.append('estado_stock', formData.estadoStock);
            if (file) {
                formDataObj.append('file', file);
            } else {
                // Manejar el caso en que file sea null
                console.error('No se ha seleccionado ningún archivo');
            }

            const api = axios.create({
                baseURL: 'http://localhost:8000',
            });
            const response = await api.post('/productos/', formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response) {
                router.push('/historial');                
            }

            if (response) {
                console.log('Producto agregado exitosamente');
            } else {
                console.error('Error al agregar producto');
            }
        } catch (error) {
            console.error('Error en la petición', error);
        }
    };

    return (
        <>
            <NavbarAdmin />
            <form className='p-16 select-none' onSubmit={handleSubmit}>
                <h1 className='font-bold text-3xl text-center text-black mb-6 lg:m-auto'>Agregar Producto</h1>
                <div className="space-y-12 lg:p-12">
                    
                    {/* Sección: Información del Producto */}
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Información del Producto</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Esta información se mostrará dentro de la plataforma, así que ten cuidado con lo que compartes.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        placeholder="Nombre del producto"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="precio_unitario" className="block text-sm font-medium leading-6 text-gray-900">Precio</label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        id="precio_unitario"
                                        name="precio_unitario"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        placeholder="Precio del producto($)"
                                        value={formData.precio_unitario}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="descripcion" className="block text-sm font-medium leading-6 text-gray-900">Descripción</label>
                                <div className="mt-2">
                                    <textarea
                                        id="descripcion"
                                        name="descripcion"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        value={formData.descripcion}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Digite la descripción del producto.</p>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">Fotografía</label>
                                <div className="mt-2 flex flex-col items-start gap-x-3">
                                    <PhotoIcon className="h-64 w-64 text-gray-300" aria-hidden="true" />
                                    <input
                                        type="file"
                                        id="photo"
                                        name="photo"
                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="categoria" className="block text-sm font-medium leading-6 text-gray-900">Categoría</label>
                                <div className="mt-2">
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
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Seleccione una categoría.</p>
                            </div>
                        </div>
                    </div>

                    {/* Sección: Información del Proveedor */}
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Información del Proveedor</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Información adicional sobre el proveedor del producto.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="nombre_proveedor" className="block text-sm font-medium leading-6 text-gray-900">Proveedor</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="nombre_proveedor"
                                        name="nombre_proveedor"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        value={formData.nombre_proveedor}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="nit" className="block text-sm font-medium leading-6 text-gray-900">NIT</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="nit"
                                        name="nit"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        value={formData.nit}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="direccion" className="block text-sm font-medium leading-6 text-gray-900">Dirección</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="direccion"
                                        name="direccion"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        value={formData.direccion}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="telefono" className="block text-sm font-medium leading-6 text-gray-900">Teléfono</label>
                                <div className="mt-2">
                                    <input
                                        type="tel"
                                        id="telefono"
                                        name="telefono"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección: Información de Inventario */}
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Información de Inventario</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Información relacionada con el inventario del producto.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="cantidad" className="block text-sm font-medium leading-6 text-gray-900">Cantidad</label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        id="cantidad"
                                        name="cantidad"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        value={formData.cantidad}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="ubicacion" className="block text-sm font-medium leading-6 text-gray-900">Ubicación</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="ubicacion"
                                        name="ubicacion"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        value={formData.ubicacion}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="estadoStock" className="block text-sm font-medium leading-6 text-gray-900">Estado del Stock</label>
                                <div className="mt-2">
                                    <select
                                        id="estadoStock"
                                        name="estadoStock"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        value={formData.estadoStock}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Selecciona un estado</option>
                                        <option value="Disponible">Disponible</option>
                                        <option value="Poca cantidad">Poca cantidad</option>
                                        <option value="Agotado">Agotado</option>
                                        <option value="Reservado">Reservado</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-full sm:col-start-1">
                                <label htmlFor="fecha" className="block text-sm font-medium leading-6 text-gray-900">Fecha de Creación</label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        id="fecha"
                                        name="fecha"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        value={formData.fecha}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-span-full sm:col-start-1">
                                <label htmlFor="fecha_actualizacion" className="block text-sm font-medium leading-6 text-gray-900">Fecha de Actualización</label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        id="fecha_actualizacion"
                                        name="fecha_actualizacion"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        value={formData.fecha_actualizacion}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancelar</button>
                    <button
                        type="submit"
                        className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </>
    );
}
