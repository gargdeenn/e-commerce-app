'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

export default function RecommendedProducts(){

    const [products, setProducts] = useState([])

    useEffect(()=>{
        const fetchProducts = async() =>{
            const res = await axios.get('https://jsonplaceholder.typicode.com/photos')
            const randomizedProducts = res.data.sort(() => Math.random() - 0.5);
            setProducts(randomizedProducts.slice(0, 10))
        }
        fetchProducts()
    }, [])

    return <>
        <div className="bg-gray-800">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-white">Productos recomendados</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                
                        {
                            products.map((product:any)=>(
                                <div key={product.id} className="group relative overflow-x flex justify-around gap-30">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-x my-12 rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                        <Image src={product.url} width={256} height={256} alt="recomended." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                                        <div className="mt-4 flex justify-between">
                                            <div>
                                                <h3 className="text-sm text-white">
                                                <a href="#">
                                                    <span aria-hidden="true" className="absolute inset-0 "></span>
                                                    Producto recomendado
                                                </a>
                                                </h3>
                                                <p className="mt-1 text-sm text-white">{product.thumbnailUrl}</p>
                                            </div>
                                            <p className="text-sm font-medium text-white">$99</p>
                                        </div>
                                        
                                    </div>
                                </div>
                            ))
                        }
                </div>
            </div>
        </div>

    </>
}