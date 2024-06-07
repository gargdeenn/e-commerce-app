'use client';
import NavbarAdmin from '@/app/components/navbar/navbar-admin';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from "next/navigation";

export default function AddJobApplication() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        id_vacante: id || '',
    });
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            if (name === 'cv') {
                setCvFile(files[0]);
            } else if (name === 'carta_presentacion') {
                setCoverLetterFile(files[0]);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formDataObj = new FormData();
            formDataObj.append('nombre', formData.nombre);
            formDataObj.append('email', formData.email);
            formDataObj.append('telefono', formData.telefono);
            formDataObj.append('id_vacante', formData.id_vacante);
            if (cvFile) {
                formDataObj.append('cv', cvFile);
            }
            if (coverLetterFile) {
                formDataObj.append('carta_presentacion', coverLetterFile);
            }

            const api = axios.create({
                baseURL: 'http://localhost:8000',
            });
            const response = await api.post('/postular/', formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                router.push('/')
                // router.push('/success-page'); // Redirigir a una página de éxito
            } else {
                console.error('Error al enviar solicitud de empleo');
            }
        } catch (error) {
            console.error('Error en la petición', error);
        }
    };

    return (
        <>
            <form className='p-16 select-none' onSubmit={handleSubmit}>
                <h1 className='font-bold text-3xl text-center text-black mb-6 lg:m-auto'>Enviar Solicitud de Empleo</h1>
                <div className="space-y-12 lg:p-12">
                    <label htmlFor="id_vacante" className="block text-sm font-medium leading-6 text-gray-900">
                        Vacante número: {formData.id_vacante}
                    </label>
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Información Personal</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Esta información se usará para contactarte.</p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">
                                    Nombre Completo
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        placeholder="Nombre Completo"
                                        required
                                        value={formData.nombre}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        placeholder="ejemplo@email.com"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="telefono" className="block text-sm font-medium leading-6 text-gray-900">
                                    Teléfono
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="tel"
                                        id="telefono"
                                        name="telefono"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        placeholder="Teléfono"
                                        required
                                        value={formData.telefono}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Archivos Adjuntos</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Adjunta tu CV y carta de presentación.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label htmlFor="cv" className="block text-sm font-medium leading-6 text-gray-900">
                                    Curriculum Vitae
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <input
                                        type="file"
                                        id="cv"
                                        name="cv"
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="carta_presentacion" className="block text-sm font-medium leading-6 text-gray-900">
                                    Carta de Presentación
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <input
                                        type="file"
                                        id="carta_presentacion"
                                        name="carta_presentacion"
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
