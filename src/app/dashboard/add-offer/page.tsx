'use client';
import NavbarAdmin from '@/app/components/navbar/navbar-admin'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'

export default function AddJobOffer() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        rango_salarial: '',
        modalidad: '',
        ubicacion: '',
        requisitos: '',
        estado: true,
        fecha_publicacion: '',
        fecha_vencimiento: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const vacante = {
            titulo: formData.titulo,
            descripcion: formData.descripcion,
            rango_salarial: formData.rango_salarial,
            modalidad: formData.modalidad,
            ubicacion: formData.ubicacion,
            requisitos: formData.requisitos,
            estado: formData.estado,
            fecha_publicacion: formData.fecha_publicacion,
            fecha_vencimiento: formData.fecha_vencimiento
        }
        try {
            const response = await axios.post('http://localhost:8000/vacante/', vacante);
            if (response.status === 201) {
                console.log('Oferta de empleo agregada exitosamente');
                router.push('/dashboard');
            } else {
                console.error('Error al agregar oferta de empleo');
            }
        } catch (error) {
            console.error('Error en la petición', error);
        }
    };

    return (
        <>
            <NavbarAdmin />
            <form className='p-16 select-none' onSubmit={handleSubmit}>
                <h1 className='font-bold text-3xl text-center text-black mb-6 lg:m-auto'>Agregar Oferta de Empleo</h1>
                <div className="space-y-12 lg:p-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Información General</h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="titulo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Título
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="titulo"
                                        name="titulo"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        placeholder="Título"
                                        required
                                        value={formData.titulo}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="descripcion" className="block text-sm font-medium leading-6 text-gray-900">
                                    Descripción
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="descripcion"
                                        name="descripcion"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        placeholder="Descripción"
                                        required
                                        value={formData.descripcion}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Detalles de la Oferta</h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="rango_salarial" className="block text-sm font-medium leading-6 text-gray-900">
                                    Rango Salarial
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="rango_salarial"
                                        name="rango_salarial"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        placeholder="Rango Salarial"
                                        required
                                        value={formData.rango_salarial}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="modalidad" className="block text-sm font-medium leading-6 text-gray-900">
                                    Modalidad
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="modalidad"
                                        name="modalidad"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        placeholder="Modalidad"
                                        required
                                        value={formData.modalidad}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="ubicacion" className="block text-sm font-medium leading-6 text-gray-900">
                                    Ubicación
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="ubicacion"
                                        name="ubicacion"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        placeholder="Ubicación"
                                        required
                                        value={formData.ubicacion}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Información Adicional</h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="requisitos" className="block text-sm font-medium leading-6 text-gray-900">
                                    Requisitos
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="requisitos"
                                        name="requisitos"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        placeholder="Requisitos"
                                        required
                                        value={formData.requisitos}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="estado" className="block text-sm font-medium leading-6 text-gray-900">
                                    Estado
                                </label>
                                <div className="mt-2 flex gap-3">
                                    <label htmlFor="activo" className='text-black text-sm'>Activo</label>
                                    <input
                                        type="radio"
                                        id="activo"
                                        name="estado"
                                        value="true"
                                        checked={formData.estado === true}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="inactivo" className='text-black text-sm'>Inactivo</label>
                                    <input
                                        type="radio"
                                        id="inactivo"
                                        name="estado"
                                        value="false"
                                        checked={formData.estado === false}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="fecha_publicacion" className="block text-sm font-medium leading-6 text-gray-900">
                                    Fecha de Publicación
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        id="fecha_publicacion"
                                        name="fecha_publicacion"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        required
                                        value={formData.fecha_publicacion}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="fecha_vencimiento" className="block text-sm font-medium leading-6 text-gray-900">
                                    Fecha de Vencimiento
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        id="fecha_vencimiento"
                                        name="fecha_vencimiento"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        required
                                        value={formData.fecha_vencimiento}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900"
                            onClick={() => router.back()}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
