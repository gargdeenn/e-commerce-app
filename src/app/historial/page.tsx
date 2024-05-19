'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function Historial(){

    const viewProducts = (id:any) =>{
        window.location.href = `/view-product?id=${id}`
    }

    const [products, setProducts] = useState([])

    useEffect(()=>{
        const fetchProducts = async() =>{
            const res = await axios.get('https://jsonplaceholder.typicode.com/photos')
            const randomizedProducts = res.data.sort(() => Math.random() - 0.5);
            setProducts(randomizedProducts.slice(0, 100))
        }
        fetchProducts()
    }, [])

    return <>
        <div className="w-full h-full text-black flex flex-wrap justify-start lg:justify-center items-center p-8 gap-2 lg:gap-8">
            {
                products.map((product:any)=>(
                    <div key={product.id} onClick={()=>{viewProducts(product.id)}} className="cursor-pointer border-b lg:border flex flex-col px-2 justify-around text-center items-center border-gray-250 w-full h-auto lg:w-80 lg:h-72 transition duration-300 ease-in-out hover:bg-gray-200">
                        <Image className="hidden lg:block" src={product.url} alt={product.thumbnailUrl} width={150} height={150} />
                        <h1 className="text-sm lg:my-0 my-4">{product.title}</h1>
                    </div>  
                ))
            }
        </div>
    </>
}