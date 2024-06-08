'use client'
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import LoadingImage from "../components/loading-image/loading-image";

const ViewproductView = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [loading, setLoading] = useState(true);
    const [productView, setProductView] = useState({
        producto: {
            nombre: '',
            precio_unitario: 0,
            descripcion: '',
            categoria: '',
            imagen: ''
        },
        proveedor: {
            nombre_proveedor: ''
        },
        inventario: {
            cantidad: 0,
            estado_stock: ''
        }
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/productos/${id}`);
                setProductView(res.data);
            } catch (error) {
                console.error("Error fetching the product:", error);
            }
        }
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        if (!cartItems.includes(id)) {
            cartItems.push(id);
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert("Producto añadido al carrito");
    };

    return (
        <main className="select-none text-black">
            <div className="flex flex-col lg:flex-row lg:p-24 lg:gap-x-6 gap-12 p-12">
                <div className="w-full lg:w-1/2 lg:border-r lg:border-gray-300">
                    {loading ? (
                        <LoadingImage />
                    ) : (
                        <Image
                            draggable={'false'}
                            src={"http://localhost:8000/" + productView.producto.imagen || '/default-image.png'}
                            alt={productView.producto.nombre}
                            width={500}
                            height={500}
                        />
                    )}
                </div>
                <div className="w-full lg:w-1/2 px-3 flex flex-col gap-6">
                    <h1 className="text-3xl font-bold-700 select-none">{productView.producto.nombre}</h1>
                    <h1>${productView.producto.precio_unitario}</h1>
                    <div className="flex flex-col gap-4 lg:justify-start lg:flex-row">
                        <button
                            className="bg-blue-800 transition duration-300 ease-in-out h-10 hover:bg-blue-700 w-full lg:w-64 text-white"
                            type="button"
                            onClick={handleAddToCart}
                        >
                            Añadir al carrito
                        </button>
                    </div>
                    <div>
                        <h6 className="text-gray-600">Descripción</h6>
                        <p>{productView.producto.descripcion}</p>
                    </div>
                    <ul className="list-disc lg:ml-6">
                        <li>Categoría: {productView.producto.categoria}</li>
                        <li>Proveedor: {productView.proveedor.nombre_proveedor}</li>
                        <li>Estado en Stock: {productView.inventario.estado_stock}</li>
                    </ul>
                    <div>
                        <h6 className="text-gray-600">Detalles del Inventario</h6>
                        <p>Cantidad: {productView.inventario.cantidad}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ViewproductView;
