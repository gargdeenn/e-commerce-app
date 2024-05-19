'use client'
import Image from "next/image"
import NotFoundImage from '/public/not-found.jpg'
import { usePathname } from "next/navigation"


export default function NotFound(){

    const ruta = usePathname()

    return (
        <main className="flex justify-center max-h-screen items-center text-black bg-white">
            <div className="text-center w-full sm:w-1/2 flex flex-col m-auto select-none animate-fade-up">
                <p className="text-3xl sm:text-4xl font-semibold text-blue-800">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-blue-900 sm:text-5xl">Pagina no encontrada</h1>
                <p className="mt-6 text-base leading-7 text-black-600">Lo siento, la ruta <b>&quot;{ruta}&quot;</b> es equivocada.</p>
                <div className="mt-10 flex items-center justify-center">
                    <a href={'/'} className="rounded-md bg-gradient-to-r from-blue-900 to-blue-950 px-3.5 py-2.5 text-sm font-semibold text-white transition duration-200 ease-in-out shadow-sm hover:bg-gradient-to-r from-blue-600 to-blue-650 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Regresar a la pagina principal  &rarr;</a>
                </div>
            </div>
            <div className="hidden lg:block w-1/3">
                <Image className="w-full" draggable={'false'} alt="not-found" src={NotFoundImage} width={0} height={0} />
            </div>
        </main>
    )
}