import NavbarAdmin from '@/app/components/navbar/navbar-admin'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

export default function AddOffer() {
        return <>
            <NavbarAdmin /> 
            <form className='p-16 select-none'>
                <h1 className='font-bold text-3xl text-center text-black mb-6 lg:m-auto'>Agregar Oferta</h1>
                <div className="space-y-12 lg:p-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Informacion de la oferta</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Esta información se mostrará dentro de la plataforma, así que ten cuidado con lo que compartes.
                    </p>
        
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="flex flex-col lg:flex-row gap-y-4 gap-x-12">
                        <div className="sm:col-span-4">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                            Titulo
                            </label>
                            <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-900 sm:max-w-md">
                            <input
                                type="text"
                                className="relative m-0 block flex-auto rounded-s border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-black font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-blue-900 focus:shadow-inset focus:outline-none motion-reduce:transition-none lg:w-64"
                                placeholder="Titulo de la oferta"
                                aria-label="title"
                                required
                                />
                            </div>
                            </div>
                        </div>
                        <div className="col-span-4 sm:col-start-1">
                            <label htmlFor="date-start" className="block text-sm font-medium leading-6 text-gray-900">
                            Fecha de publicacion
                            </label>
                            <div className="mt-2">
                            <input
                                type="date"
                                name="date-start"
                                id="date-start"
                                className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                required
                            />
                            </div>
                        </div>
                    </div>
        
                    <div className="col-span-full">
                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                        Descripcion
                        </label>
                        <div className="mt-2">
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                            defaultValue={''}
                            required
                        />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Digite la descripcion de la oferta.</p>
                    </div>
                    </div>
                </div>
        
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Informacion adicional</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Informacion adicional sobre la oferta a añadir.</p>
        
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-4">
                            <label htmlFor="salary-range" className="block text-sm font-medium leading-6 text-gray-900">
                            Rango salarial
                            </label>
                            <div className="mt-2">
                            <input
                                id="salary-range"
                                name="salary-range"
                                type="number"
                                className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                required
                            />
                            </div>
                        </div>
            
                        <div className="col-span-4">
                            <label htmlFor="proveedor" className="block text-sm font-medium leading-6 text-gray-900">
                            Proveedor
                            </label>
                            <div className="mt-2">
                            <input
                                type="text"
                                name="proveedor"
                                id="proveedor"
                                autoComplete="proveedor"
                                className="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                required
                            />
                            </div>
                        </div>

                        <div className="col-span-4">
                            <label htmlFor="modalidad" className="block text-sm font-medium leading-6 text-gray-900">
                            Modalidad
                            </label>
                            <div className="mt-2">
                            <input
                                type="text"
                                name="modalidad"
                                id="modalidad"
                                autoComplete="modalidad"
                                className="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                required
                            />
                            </div>
                        </div>
                        <div className="col-span-4 sm:col-start-1">
                            <label htmlFor="due-date" className="block text-sm font-medium leading-6 text-gray-900">
                            Fecha de vencimiento
                            </label>
                            <div className="mt-2">
                            <input
                                type="date"
                                name="due-date"
                                id="due-date"
                                className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                required
                            />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                            Ubicacion
                            </label>
                            <div className="mt-2">
                            <input
                                type="text"
                                name="location"
                                id="location"
                                autoComplete="location"
                                className="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                required
                            />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <label htmlFor="requirements" className="block text-sm font-medium leading-6 text-gray-900">
                            Requisitos
                            </label>
                            <div className="mt-2">
                            <input
                                type="text"
                                name="requirements"
                                id="requirements"
                                autoComplete="requirements"
                                className="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                required
                            />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                            Estado
                            </label>
                            <div className="mt-2 flex gap-3">
                            <label htmlFor="" className='text-black text-xm'>Activo</label>
                            <input
                                type="radio"
                                name="state"
                                id="state"
                                autoComplete="state"
                                className=""
                                required
                            />
                            <label htmlFor="" className='text-black text-xm'>Inactivo</label>
                            <input
                                type="radio"
                                name="state"
                                id="state"
                                autoComplete="state"
                                className=""
                                required
                            />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        
                <div className="mb-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    Guardar
                </button>
                </div>
            </form>
        </>
    }