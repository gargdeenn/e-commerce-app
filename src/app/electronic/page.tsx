'use client'
import axios from "axios";
import { useState } from "react";
import { useEffect} from "react"
import Navbar from "../components/navbar/navbar";
import Image from 'next/image'

export default function Electronic({cantidadProductos = 5000}){
 const viewProducts = (id:any) => {
        window.location.href = `/view-product?id=${id}`
    }

    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:8000/productos')
                const modaProducts = res.data.filter((product: any) => product.producto.categoria === 'Electronica')
                setProducts(modaProducts.slice(0, cantidadProductos))
            } catch (error) {
                console.error("Error fetching products:", error)
            }
        }
        fetchProducts()
    }, [cantidadProductos])

    return (
        <main className='relative flex flex-wrap w-full justify-center items-center gap-8'>
            <Navbar/>
            {
                products.map((product: any, index) => (
                    <div key={index} className='animate-fade-up'>
                        <div className="relative flex w-64 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                            <div className="relative mx-4 mt-4 h-60 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                                <Image
                                    width={256}
                                    height={256}
                                    alt={product.producto.nombre}
                                    src={"http://localhost:8000/"+product.producto.imagen} // Aquí debes reemplazar 'imagenUrl' con el campo correcto que contiene la URL de la imagen del producto en tu API
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <div className="mb-2 flex items-center justify-between">
                                    <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                                        {product.producto.nombre}
                                    </p>
                                    <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                                        ${product.producto.precio_unitario}
                                    </p>
                                </div>
                                <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                                    {product.producto.descripcion}
                                </p>
                            </div>
                            <div className="p-6 pt-0">
                                <button
                                    onClick={() => { viewProducts(product.producto.id) }}
                                    className="block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                >
                                    Ver producto
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </main>
    )
}