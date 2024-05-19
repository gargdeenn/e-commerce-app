'use client'
import { Collapse, Dropdown, initTWE, Offcanvas, Ripple, } from "tw-elements";
import { useEffect, useState } from "react";
import Image from "next/image";
import DrawerOferts from "../drawer/drawer-oferts";
import DrawerEmployees from "../drawer/drawer-employees";
import DrawerProducts from "../drawer/drawer-products";
import { usePathname } from "next/navigation";


export default function NavbarAdmin(){

    useEffect(()=>{
        initTWE({ Collapse, Dropdown, Offcanvas, Ripple });
    }, [])

    const [isOpenEmployees, setIsOpenEmployees] = useState(false);

    function toggleDrawerEmployees(){
        setIsOpenEmployees(!isOpenEmployees);
    };

    const [isOpenProducts, setIsOpenProducts] = useState(false);


    function toggleDrawerProducts(){
        setIsOpenProducts(!isOpenProducts);
    };


    const [isOpenOferts, setIsOpenOferts] = useState(false);

    function toggleDrawerOferts(){
        setIsOpenOferts(!isOpenOferts);
    };


    return <>
        <nav
        className="flex-no-wrap sticky top-0 z-50 relative flex w-full items-center justify-between bg-gradient-to-r from-blue-900 to-blue-950 py-1 shadow-dark-mild dark:bg-gradient-to-r from-blue-850 to-blue-950 lg:flex-wrap lg:justify-start lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
            <button
            className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button"
            data-twe-collapse-init
            data-twe-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span
                className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clipRule="evenodd" />
                </svg>
            </span>
            </button>

            <div
            className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
            id="navbarSupportedContent1"
            data-twe-collapse-item>
            <a
                className="mb-4 me-5 ms-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
                href={'/dashboard'}>
                <Image
                src={'/favicon.ico'}
                height={25}
                width={25}
                alt="TE Logo"
                loading="lazy" />

            </a>
            
            <ul
                className="list-style-none me-auto flex flex-col ps-0 lg:flex-row"
                data-twe-navbar-nav-ref>
                <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                <a
                    className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                    href={'/dashboard'}
                    data-twe-nav-link-ref
                    >Dashboard</a>
                </li>


                <li className="mb-4 lg:mb-0 lg:pe-2"> 

                    <a className="text-black/60 select-none cursor-pointer transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2 disabled:opacity-50 disabled:pointer-events-none" onClick={toggleDrawerEmployees}>
                    Empleados
                    </a>

                    <DrawerEmployees toggleDrawer={toggleDrawerEmployees} isOpen={isOpenEmployees} name={"Empleados"}>
                        <ul className="mt-8 select-none flex flex-col items-center gap-y-6">
                            <li>
                                <a className="transition duration-300 ease-in-out hover:text-gray-400" href="">Nomina de empleados</a>
                            </li>
                            <li>
                                <a className="transition duration-300 ease-in-out hover:text-gray-400" href="">Gestionar empleados</a>
                            </li>
                            <li>
                                <a className="transition duration-300 ease-in-out hover:text-gray-400" href={"dashboard/add-employed"}>Ingresar empleados</a>
                            </li>
                        </ul>
                    </DrawerEmployees>

                </li>


                <li className="mb-4 lg:mb-0 lg:pe-2">
                
                    <a className="text-black/60 select-none cursor-pointer transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2 disabled:opacity-50 disabled:pointer-events-none" onClick={toggleDrawerProducts}>
                        Productos
                        </a>

                    <DrawerProducts toggleDrawer={toggleDrawerProducts} isOpen={isOpenProducts} name={"Productos"}>
                        <ul className="mt-8 select-none flex flex-col items-center gap-y-6">
                            <li>
                                <a className="transition duration-300 ease-in-out hover:text-gray-400" href="">Gestionar productos</a>
                            </li>
                            <li>
                                <a className="transition duration-300 ease-in-out hover:text-gray-400" href={"dashboard/add-product"}>Ingresar productos</a>
                            </li>
                        </ul>
                    </DrawerProducts>

                </li>


                <li className="mb-4 lg:mb-0 lg:pe-2">
                
                    <a className="text-black/60 select-none cursor-pointer transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2 disabled:opacity-50 disabled:pointer-events-none" onClick={toggleDrawerOferts}>
                        Ofertas
                        </a>

                    <DrawerOferts toggleDrawer={toggleDrawerOferts} isOpen={isOpenOferts} name={"Ofertas"}>
                        <ul className="mt-8 select-none flex flex-col items-center gap-y-6">
                            <li>
                                <a className="transition duration-300 ease-in-out hover:text-gray-400" href="">Gestionar ofertas</a>
                            </li>
                            <li>
                                <a className="transition duration-300 ease-in-out hover:text-gray-400" href={"dashboard/add-offer"}>Ingresar ofertas</a>
                            </li>
                        </ul>
                    </DrawerOferts>

                </li>
            </ul>
            
            </div>
            <div className="relative flex items-center">
            <a className="me-4 text-neutral-600 dark:text-white" href="#">
                <span className="[&>svg]:w-5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path
                    d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
                </span>
            </a>

            
            <div
                className="relative"
                data-twe-dropdown-ref
                data-twe-dropdown-alignment="end">
                <a
                className="me-4 flex items-center text-neutral-600 dark:text-white"
                href="#"
                id="dropdownMenuButton1"
                role="button"
                data-twe-dropdown-toggle-ref
                aria-expanded="false">
                
                <span className="[&>svg]:w-5">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                        clipRule="evenodd" />
                    </svg>
                </span>
                
                <span
                    className="absolute -mt-4 ms-2.5 rounded-full bg-danger px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white"
                    >1</span>
                </a>
                
                <ul
                className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
                aria-labelledby="dropdownMenuButton1"
                data-twe-dropdown-menu-ref>
                <li>
                    <a
                    className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                    href="#"
                    data-twe-dropdown-item-ref
                    >Action</a>
                </li>
                <li>
                    <a
                    className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                    href="#"
                    data-twe-dropdown-item-ref
                    >Another action</a>
                </li>
                <li>
                    <a
                    className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                    href="#"
                    data-twe-dropdown-item-ref
                    >Something else here</a>
                </li>
                </ul>
            </div>

            <div
                className="relative"
                data-twe-dropdown-ref
                data-twe-dropdown-alignment="end">
                <a
                className="flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                href="#"
                id="dropdownMenuButton2"
                role="button"
                data-twe-dropdown-toggle-ref
                aria-expanded="false">
                <Image
                    src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                    className="rounded-full"
                    height={25}
                    width={25}
                    alt=""
                    loading="lazy" />
                </a>
                <ul
                className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
                aria-labelledby="dropdownMenuButton2"
                data-twe-dropdown-menu-ref>
                <li>
                    <a
                    className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                    href="#"
                    data-twe-dropdown-item-ref
                    >Action</a>
                </li>
                <li>
                    <a
                    className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                    href="#"
                    data-twe-dropdown-item-ref
                    >Another action</a>
                </li>
                <li>
                    <a
                    className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                    href="#"
                    data-twe-dropdown-item-ref
                    >Something else here</a>
                </li>
                </ul>
            </div>
            </div>
        </div>
        </nav> 
    </>
}