'use client'
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import LoadingImage from "../components/loading-image/loading-image";
import Link from "next/link";
import NavbarLogout from "../components/navbar/navbar-logout";

const ViewVacanteView = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    // const aplicarVacante = (id:any) => {
    //     window.location.href = `/aplicar-vacante?id=${id}`
    // }
    const [loading, setLoading] = useState(true);
    const [vacanteView, setVacanteView] = useState({
        titulo: '',
        descripcion: '',
        rango_salarial: '',
        modalidad: '',
        ubicacion: '',
        requisitos: '',
        estado: true,
        fecha_publicacion: '',
        fecha_vencimiento: '',
        id: ''
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchVacante = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/vacante/${id}`);
                setVacanteView(res.data);
            } catch (error) {
                console.error("Error fetching the vacancy:", error);
            }
        };
        fetchVacante();
    }, [id]);

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-12 bg-gray-100 text-black">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
                <div className="flex flex-col gap-6">
                    <h1 className="text-3xl font-bold text-center">{vacanteView.titulo}</h1>
                    <h2 className="text-xl text-center text-gray-700">${vacanteView.rango_salarial}</h2>
                    <div className="border-t border-gray-300 mt-4 pt-4">
                        <h6 className="text-gray-600">Descripción</h6>
                        <p>{vacanteView.descripcion}</p>
                    </div>
                    <div className="border-t border-gray-300 mt-4 pt-4">
                        <h6 className="text-gray-600">Modalidad</h6>
                        <p>{vacanteView.modalidad}</p>
                    </div>
                    <div className="border-t border-gray-300 mt-4 pt-4">
                        <h6 className="text-gray-600">Ubicación</h6>
                        <p>{vacanteView.ubicacion}</p>
                    </div>
                    <div className="border-t border-gray-300 mt-4 pt-4">
                        <h6 className="text-gray-600">Requisitos</h6>
                        <p>{vacanteView.requisitos}</p>
                    </div>
                    <div className="border-t border-gray-300 mt-4 pt-4">
                        <h6 className="text-gray-600">Estado de la vacante</h6>
                        <p>{vacanteView.estado ? 'Activo' : 'Inactivo'}</p>
                    </div>
                    <div className="border-t border-gray-300 mt-4 pt-4">
                        <h6 className="text-gray-600">Fecha de Publicación</h6>
                        <p>{vacanteView.fecha_publicacion}</p>
                    </div>
                    <div className="border-t border-gray-300 mt-4 pt-4">
                        <h6 className="text-gray-600">Fecha de Vencimiento</h6>
                        <p>{vacanteView.fecha_vencimiento}</p>
                    </div>
                    <div className="mt-8">
                        <Link legacyBehavior href={`/aplicar-vacante?id=${vacanteView.id}`}>
                            <a className="block w-full select-none rounded-lg bg-blue-800 py-3 px-6 text-center text-white font-bold uppercase transition duration-300 ease-in-out hover:bg-blue-700">
                                Aplicar a la Vacante
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ViewVacanteView;
