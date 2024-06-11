'use client'
import React, { useState } from 'react';
import ProductsAllSearchComponent from '../components/products-all-search/page';

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <ProductsAllSearchComponent cantidadProductos={5000} searchTerm={searchTerm} itemsPerPage={10} />
        </>
    );
}
