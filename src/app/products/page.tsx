'use client'
import React, { useState } from 'react';
import ProductsComponent from "../components/products/products";

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <div className="text-center mb-8 mt-8">
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="px-4 py-2 border border-gray-300 container rounded-md"
                />
            </div>
            <ProductsComponent cantidadProductos={5000} searchTerm={searchTerm} />
        </>
    );
}
