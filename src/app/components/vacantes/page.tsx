'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../navbar/navbar';

interface JobData {
    id: string;
    titulo: string;
    descripcion: string;
    rango_salarial: string;
    modalidad: string;
    ubicacion: string;
    requisitos: string;
    estado: boolean;
    fecha_publicacion: string;
    fecha_vencimiento: string;
}

interface VacanciesComponentProps {
    cantidadVacantes: number;
}

const VacantesComponent = ({ cantidadVacantes }: VacanciesComponentProps) => {
    const [vacancies, setVacancies] = useState<JobData[]>([]);
    const viewVacantes = (id:any) => {
        window.location.href = `/view-vacantes?id=${id}`
    }

    useEffect(() => {
        const fetchVacancies = async () => {
            try {
                const res = await axios.get('http://localhost:8000/vacante/');
                setVacancies(res.data.slice(0, cantidadVacantes));
            } catch (error) {
                console.error("Error fetching vacancies:", error);
            }
        };
        fetchVacancies();
    }, [cantidadVacantes]);

    return (
        <main className='relative flex flex-wrap w-full justify-center items-center gap-8 my-8'>
            {vacancies.map((vacancy, index) => (
                <div key={index} className='animate-fade-up'>
                    <div className="relative flex w-64 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                        <div className="p-6">
                            <div className="mb-2 flex items-center justify-between">
                                <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                                    {vacancy.titulo}
                                </p>
                                <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                                    {vacancy.rango_salarial}
                                </p>
                            </div>
                            <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                                {vacancy.descripcion}
                            </p>
                        </div>
                        <div className="p-6 pt-0">
                             <button
                                    onClick={() => { viewVacantes(vacancy.id) }}
                                    className="block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                >
                                    Ver detalles de la vacante
                                </button>
                        </div>
                    </div>
                </div>
            ))}
        </main>
    );
};

export default VacantesComponent;
