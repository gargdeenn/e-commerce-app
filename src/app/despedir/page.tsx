'use client'
import React, { useState, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import NavbarAdmin from '@/app/components/navbar/navbar-admin'
import { useRouter } from 'next/navigation'

const DespedirPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fecha: '',
    motivo: '',
    comentarios: ''
  });
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!id) {
      console.error('El ID de usuario no está presente en la URL');
      return;
    }

    const data = {
      ...formData,
      id_user: parseInt(id) // Asignar id_user desde la URL
    };

    try {
      const response = await axios.post('http://localhost:8000/despido/', data);
      if (response.status === 201) {
        console.log('Despido registrado exitosamente');
        router.push('/dashboard');
      } else {
        console.error('Error al registrar el despido');
      }
    } catch (error) {
      console.error('Error en la petición', error);
    }
  };

  return (
    <>
      <NavbarAdmin />
      <form className='p-16 select-none' onSubmit={handleSubmit}>
        <h1 className='font-bold text-3xl text-center text-black mb-6 lg:m-auto'>Registrar Despido</h1>
        <div className="space-y-12 lg:p-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Información del Despido</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="fecha" className="block text-sm font-medium leading-6 text-gray-900">
                  Fecha
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                    required
                    value={formData.fecha}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="motivo" className="block text-sm font-medium leading-6 text-gray-900">
                  Motivo
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="motivo"
                    name="motivo"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                    placeholder="Motivo"
                    required
                    value={formData.motivo}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="comentarios" className="block text-sm font-medium leading-6 text-gray-900">
                  Comentarios
                </label>
                <div className="mt-2">
                  <textarea
                    id="comentarios"
                    name="comentarios"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                    placeholder="Comentarios"
                    required
                    value={formData.comentarios}
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
};

export default DespedirPage;
