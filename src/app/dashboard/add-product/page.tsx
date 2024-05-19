import NavbarAdmin from '@/app/components/navbar/navbar-admin'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

export default function AddProduct() {
        return <>
            <NavbarAdmin /> 
            <form className='p-16 select-none'>
                <h1 className='font-bold text-3xl text-center text-black mb-6 lg:m-auto'>Agregar Producto</h1>
                <div className="space-y-12 lg:p-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Informacion del producto</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Esta información se mostrará dentro de la plataforma, así que ten cuidado con lo que compartes.
                    </p>
        
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="flex flex-col lg:flex-row gap-y-4 gap-x-12">
                        <div className="sm:col-span-4">
                            <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">
                            Nombre
                            </label>
                            <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-900 sm:max-w-md">
                            <input
                                type="text"
                                className="relative m-0 block flex-auto rounded-s border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-black font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-blue-900 focus:shadow-inset focus:outline-none motion-reduce:transition-none lg:w-64"
                                placeholder="Nombre del producto"
                                aria-label="Nombre"
                                required
                                />
                            </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="precio" className="block text-sm font-medium leading-6 text-gray-900">
                            Precio
                            </label>
                            <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-900 sm:max-w-md">
                            <input
                                type="number"
                                className="relative m-0 block flex-auto rounded-s border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-black font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-blue-900 focus:shadow-inset focus:outline-none motion-reduce:transition-none lg:w-64"
                                placeholder="Precio del producto($)"
                                aria-label="precio"
                                required
                                />
                            </div>
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
                        <p className="mt-3 text-sm leading-6 text-gray-600">Digite la descripcion del producto.</p>
                    </div>
        
                    <div className="col-span-full">
                        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                        Fotografia
                        </label>
                        <div className="mt-2 flex flex-col items-start gap-x-3">
                            <PhotoIcon className="h-64 w-64 text-gray-300" aria-hidden="true" />
                            <input
                                type="file"
                                name=''
                                id=''
                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"    
                                />
                        </div>
                    </div>
                    </div>
                </div>
        
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Informacion adicional</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Informacion adicional sobre el producto a añadir.</p>
        
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-4">
                            <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                            Stock
                            </label>
                            <div className="mt-2">
                            <input
                                id="stock"
                                name="stock"
                                type="number"
                                autoComplete="stock"
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
                            <label htmlFor="categoria" className="block text-sm font-medium leading-6 text-gray-900">
                            Categoria
                            </label>
                            <div className="mt-2">
                            <select name="categoria" className='block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6' id="categoria">
                                <option value="">Selecciona una categoria</option>
                            </select>
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">Seleccione una categoria.</p>
                        </div>
        
                        <div className="col-span-4 sm:col-start-1">
                            <label htmlFor="date-start" className="block text-sm font-medium leading-6 text-gray-900">
                            Fecha
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
        
                    <div className="col-span-4">
                        <label htmlFor="date-update" className="block text-sm font-medium leading-6 text-gray-900">
                        Fecha de actualizacion
                        </label>
                        <div className="mt-2">
                        <input
                            type="date"
                            name="date-update"
                            id="date-update"
                            className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
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