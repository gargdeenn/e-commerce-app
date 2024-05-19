import NavbarAdmin from '@/app/components/navbar/navbar-admin'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

export default function AddEmployed() {
        return <>
            <NavbarAdmin /> 
            <form className='p-16 select-none'>
                <h1 className='font-bold text-3xl text-center text-black mb-6 lg:m-auto'>Agregar empleado</h1>
                <div className="space-y-12 lg:p-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Informacion personal</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Esta información se mostrará dentro de la plataforma, así que ten cuidado con lo que compartes.
                    </p>
        
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="flex flex-col lg:flex-row gap-y-4 gap-x-12">
                        <div className="sm:col-span-4">
                            <label htmlFor="nombres" className="block text-sm font-medium leading-6 text-gray-900">
                            Nombre(s)
                            </label>
                            <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-900 sm:max-w-md">
                            <input
                                type="text"
                                className="relative m-0 block flex-auto rounded-s border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-black font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-blue-900 focus:shadow-inset focus:outline-none motion-reduce:transition-none lg:w-64"
                                placeholder="Nombre(s)"
                                aria-label="Nombres"
                                required
                                />
                            </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="apellidos" className="block text-sm font-medium leading-6 text-gray-900">
                            Apellido(s)
                            </label>
                            <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-900 sm:max-w-md">
                            <input
                                type="text"
                                className="relative m-0 block flex-auto rounded-s border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-black font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-blue-900 focus:shadow-inset focus:outline-none motion-reduce:transition-none lg:w-64"
                                placeholder="Apellido(s)"
                                aria-label="Apellidos" 
                                required
                                />
                            </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="cedula" className="block text-sm font-medium leading-6 text-gray-900">
                            Cedula
                            </label>
                            <div className="mt-2 ">
                            <div className="flex rounded-md shadow-sm ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-900 sm:max-w-md">
                            <input
                                type="number"
                                className="relative m-0 block flex-auto rounded-s border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-black font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-blue-900 focus:shadow-inset outline-none motion-reduce:transition-none lg:w-64"
                                placeholder="Cedula"
                                aria-label="Cedula" 
                                required
                                />
                            </div>
                            </div>
                        </div>
                    </div>
        
                    <div className="col-span-full">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                        Experiencia laboral
                        </label>
                        <div className="mt-2">
                        <textarea
                            id="about"
                            name="about"
                            rows={3}
                            className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                            defaultValue={''}
                            required
                        />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Digite su experiencia laboral.</p>
                    </div>
        
                    <div className="col-span-full">
                        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                        Fotografia
                        </label>
                        <div className="mt-2 flex items-center gap-x-3">
                        <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
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
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Informacion Personal</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Usa un correo electronico permanente.</p>
        
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Direccion de correo
                        </label>
                        <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder='ejemplo@email.com'
                            className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                            required
                        />
                        </div>
                    </div>
        
                    <div className="col-span-full">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                        Cargo en la empresa
                        </label>
                        <div className="mt-2">
                        <textarea
                            id="about"
                            name="about"
                            rows={3}
                            className="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                            defaultValue={''}
                            required
                        />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Digite su cargo en la empresa.</p>
                    </div>
        
                    <div className="col-span-full">
                        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                        Direccion de calle
                        </label>
                        <div className="mt-2">
                        <input
                            type="text"
                            name="street-address"
                            id="street-address"
                            autoComplete="street-address"
                            className="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                            required
                        />
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                        Habilidades
                        </label>
                        <div className="mt-2">
                        <textarea
                            id="about"
                            name="about"
                            rows={3}
                            className="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                            defaultValue={''}
                            required
                        />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Digite sus habilidades.</p>
                    </div>
        
                    <div className="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                        Ciudad
                        </label>
                        <div className="mt-2">
                        <input
                            type="text"
                            name="city"
                            id="city"
                            autoComplete="address-level2"
                            className="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                            required
                        />
                        </div>
                    </div>
        
                    <div className="sm:col-span-2">
                        <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                        Estado / Provincia
                        </label>
                        <div className="mt-2">
                        <input
                            type="text"
                            name="region"
                            id="region"
                            autoComplete="address-level1"
                            className="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                            required
                        />
                        </div>
                    </div>
        
                    <div className="sm:col-span-2">
                        <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        ZIP / Codigo postal
                        </label>
                        <div className="mt-2">
                        <input
                            type="text"
                            name="postal-code"
                            id="postal-code"
                            autoComplete="postal-code"
                            className="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
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