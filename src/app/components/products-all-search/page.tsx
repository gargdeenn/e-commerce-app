'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

export default function ProductsAllSearchComponent({ cantidadProductos = 5000, searchTerm = '', itemsPerPage = 10 }) {
    const viewProducts = (id) => {
        window.location.href = `/view-product?id=${id}`
    }

    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:8000/productos/')
                setProducts(res.data.slice(0, cantidadProductos))
            } catch (error) {
                console.error("Error fetching products:", error)
            }
        }
        fetchProducts()
    }, [cantidadProductos])

    const filteredProducts = products.filter(product =>
        product.producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <main className='relative flex flex-wrap w-full justify-center items-center gap-8 my-8'>
            {
                currentItems.map((product, index) => (
                    <div key={index} className='animate-fade-up'>
                        <div className="relative flex w-64 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                            <div className="relative mx-4 mt-4 h-60 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                                <Image
                                    width={256}
                                    height={256}
                                    alt={product.producto.nombre}
                                    src={"http://localhost:8000/" + product.producto.imagen}
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
            <div className='w-full flex justify-center mt-8'>
                <button 
                    disabled={currentPage === 1} 
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
                >
                    Anterior
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button 
                        key={index} 
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button 
                    disabled={currentPage === totalPages} 
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
                >
                    Siguiente
                </button>
            </div>
        </main>
    )
}
