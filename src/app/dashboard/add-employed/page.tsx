'use client';
import NavbarAdmin from '@/app/components/navbar/navbar-admin'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'

export default function AddEmployed() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        full_name: '',
        cedula: '',
        telefono: '',
        email: '',
        password: '',
        confirmPassword: '',
        id_role: '',
        exp_laboral: '',
        address: '',
        city: '',
        municipality: '',
        postal_code: '',
        cargo: '',
        habilidades: ''
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

        try {
            const formDataObj = new FormData();
            formDataObj.append('full_name', formData.full_name);
            formDataObj.append('cedula', formData.cedula);
            formDataObj.append('telefono', formData.telefono);
            formDataObj.append('email', formData.email);
            formDataObj.append('password', formData.password);
            formDataObj.append('confirmPassword', formData.confirmPassword);
            formDataObj.append('id_role', formData.id_role);
            formDataObj.append('exp_laboral', formData.exp_laboral);
            formDataObj.append('address', formData.address);
            formDataObj.append('city', formData.city);
            formDataObj.append('municipality', formData.municipality);
            formDataObj.append('postal_code', formData.postal_code);
            formDataObj.append('cargo', formData.cargo);
            formDataObj.append('habilidades', formData.habilidades);
            if (file) {
                formDataObj.append('imagen_perfil', file);
            } else {
                console.error('No se ha seleccionado ningún archivo');
            }

            const api = axios.create({
                baseURL: 'http://localhost:8000',
            });
            const response = await api.post('/users/empleados/', formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response) {
                router.push('/dashboard');    
            }

            if (response) {
                console.log('Empleado agregado exitosamente');
            } else {
                console.error('Error al agregar empleado');
            }
        } catch (error) {
            console.error('Error en la petición', error);
        }
    };

    return (
        <>
            <NavbarAdmin /> 
            <form className='p-16 select-none' onSubmit={handleSubmit}>
                <h1 className='font-bold text-3xl text-center text-black mb-6 lg:m-auto'>Agregar empleado</h1>
                <div className="space-y-12 lg:p-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Información personal</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Esta información se mostrará dentro de la plataforma, así que ten cuidado con lo que compartes.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="full_name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Nombre Completo
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="full_name"
                                        name="full_name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        placeholder="Nombre Completo"
                                        required
                                        value={formData.full_name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="cedula" className="block text-sm font-medium leading-6 text-gray-900">
                                    Cédula
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        id="cedula"
                                        name="cedula"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        placeholder="Cédula"
                                        required
                                        value={formData.cedula}
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
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Credenciales</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Usa una contraseña segura.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Dirección de correo
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
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Contraseña
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        placeholder="Contraseña"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirmar Contraseña
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        placeholder="Confirmar Contraseña"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="id_role" className="block text-sm font-medium leading-6 text-gray-900">
                                    Rol
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="id_role"
                                        name="id_role"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:max-w-xs sm:text-sm sm:leading-6"
                                        value={formData.id_role}
                                        onChange={handleChange}
                                    >
                                        <option value="1">Usuario</option>
                                        <option value="2">Empleado</option>
                                        <option value="3">Administrador</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Información Profesional</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Digite su información profesional.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label htmlFor="imagen_perfil" className="block text-sm font-medium leading-6 text-gray-900">
                                    Foto
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <input
                                        type="file"
                                        id="imagen_perfil"
                                        name="imagen_perfil"
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="exp_laboral" className="block text-sm font-medium leading-6 text-gray-900">
                                    Experiencia
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="exp_laboral"
                                        name="exp_laboral"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        placeholder="Digite su experiencia"
                                        required
                                        value={formData.exp_laboral}
                                        onChange={handleChange}
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Escriba brevemente su experiencia.</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Información de dirección</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Digite su dirección completa.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Dirección
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        placeholder="Dirección"
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    Ciudad
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        placeholder="Ciudad"
                                        required
                                        value={formData.city}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="municipality" className="block text-sm font-medium leading-6 text-gray-900">
                                    Estado / Provincia
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="municipality"
                                        name="municipality"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        placeholder="Estado / Provincia"
                                        required
                                        value={formData.municipality}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="postal_code" className="block text-sm font-medium leading-6 text-gray-900">
                                    ZIP / Código postal
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="postal_code"
                                        name="postal_code"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        placeholder="Código postal"
                                        required
                                        value={formData.postal_code}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Cargo en la empresa</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Digite su cargo en la empresa.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label htmlFor="cargo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Cargo en la empresa
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="cargo"
                                        name="cargo"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        placeholder="Cargo en la empresa"
                                        required
                                        value={formData.cargo}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Habilidades</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Digite sus habilidades.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label htmlFor="habilidades" className="block text-sm font-medium leading-6 text-gray-900">
                                    Habilidades
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="habilidades"
                                        name="habilidades"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                        placeholder="Habilidades"
                                        required
                                        value={formData.habilidades}
                                        onChange={handleChange}
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
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
