'use client'
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import LoadingImage from "../components/loading-image/loading-image"


const ViewproductView = () => {

    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);


    const [productView, setProductView] = useState({
        id: '',
        title: '',
        url: '',
        thumbnailUrl: ''
    })
    useEffect(()=>{
        const fetchProduct = async() =>{
            const res = await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`)
            setProductView(res.data)
        }
        fetchProduct()
    }, [id])

    return <>
        <main className="select-none text-black">
            <div className="flex flex-col lg:flex-row lg:p-24 lg:gap-x-6 gap-12 p-12">
                <div className="w-full lg:w-1/2 lg:border-r lg:border-gray-300">
                    {
                        loading ? (
                            <LoadingImage />
                        ) : (
                            <Image draggable={'false'} src={productView.url} alt={productView.thumbnailUrl} width={500} height={500} />
                        )
                    }
                </div>
                <div className="w-full lg:w-1/2 px-3 flex flex-col gap-6">
                    <h1 className="text-3xl font-bold-700 select-none">{productView.title}</h1>
                    <h1>*****</h1>    
                    <div className="flex flex-col gap-4 lg:justify-start lg:flex-row">
                        <button className="bg-blue-800 transition duration-300 ease-in-out h-10 hover:bg-blue-700 w-full lg:w-64 text-white" type="submit">Añadir al carrito</button>
                    </div>
                    <div className="">
                        <h6 className="text-gray-600">Descripcion</h6>
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed qui veritatis autem architecto aliquam nostrum, laborum necessitatibus magni inventore. Blanditiis, optio ut? Quis explicabo est vel fugit quisquam nemo! Suscipit. </p>
                    </div>
                    <ul className="list-disc lg:ml-6">
                        <li>Hola</li>
                        <li>Hola</li>
                        <li>Hola</li>
                    </ul>
                    <div className="">
                        <h6 className="text-gray-600">Detalles</h6>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit similique, autem eius nemo tempora cupiditate repellendus magnam harum vel odio.</p>
                    </div>
                </div>
            </div>
        </main>
    </>
} 

export default ViewproductView