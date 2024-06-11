'use client';
import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import StyleNavbar from './navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const toggleDropdownOtros = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    useEffect(() => {
        async function fetchSearchHistory() {
            try {
                const res = await axios.get(`http://localhost:8000/productos/search-history/${searchTerm}`);
                setSearchHistory(res.data);
            } catch (error) {
                console.error('Error fetching search history:', error);
            }
        }

        fetchSearchHistory();

        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    function closeSession() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        router.push('/login');
    }
    function login() {
        router.push('/login');
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value.length > 2) {
            try {
                const res = await axios.get(`http://localhost:8000/productos/suggest/${value}`);
                setSuggestions(res.data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSearchSubmit = async (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (searchTerm) {
            try {
                await axios.post('http://localhost:8000/productos/register-search', { term: searchTerm });
                router.push(`/search?query=${searchTerm}`);
            } catch (error) {
                console.error('Error registering search:', error);
            }
        }
    };

    const handleSuggestionClick = async (suggestion: unknown) => {
        setSearchTerm(suggestion as string);
        setSuggestions([]);
        try {
            await axios.post('http://localhost:8000/productos/register-search', { term: suggestion });
            router.push(`/search?query=${suggestion}`);
        } catch (error) {
            console.error('Error registering search:', error);
        }
    };

    const handleProductClick = (id: unknown) => {
        if (Number.isInteger(id)) {
            router.push(`/producto/${id}`);
        } else {
            console.error("El ID del producto no es un entero válido:", id);
        }
    };

    return (
        <nav className="flex-no-wrap sticky top-0 z-50 relative flex w-full items-center justify-between bg-gradient-to-r from-blue-900 to-blue-950 py-1 shadow-dark-mild dark:bg-gradient-to-r from-blue-850 to-blue-950 lg:flex-wrap lg:justify-start lg:py-4">
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
                    <ul
                        className="list-style-none me-auto flex flex-col ps-0 lg:flex-row"
                        data-twe-navbar-nav-ref>
                        <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                            <a
                                className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                                href={'/'}
                                data-twe-nav-link-ref
                            >Inicio</a>
                        </li>

                        <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                            <a
                                className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                                href={'/historial'}
                                data-twe-nav-link-ref
                            >Historial</a>
                        </li>

                        <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                            <a
                                className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                                href={'/products'}
                                data-twe-nav-link-ref
                            >Productos</a>
                        </li>

                        <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                            <div className="dropdown">
                                <button className="dropdown-toggle text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2" onClick={toggleDropdownOtros}>
                                    Otros
                                </button>
                                {isDropdownVisible && (
                                    <ul className="absolute z-10 mt-1 w-100 bg-white border border-gray-300 rounded-md shadow-lg">
                                        <li
                                        className="cursor-pointer p-2 hover:bg-gray-200 text-black"
                                        >
                                            <Link legacyBehavior href="/vacantes">
                                                <a className="dropdown-item">Vacantes</a>
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="ms-5 hidden transition duration-300 ease-in-out lg:flex w-[50%] focus:w-[30%] items-center justify-start pr-5">
                    <form onSubmit={handleSearchSubmit} className="relative w-full">
                        <input
                            type="search"
                            className="text-white relative m-0 block w-full rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-1.5 font-normal text-surface transition duration-300 ease-in-out focus:border-primary focus:text-white-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                            placeholder="Buscar productos"
                            aria-label="Search"
                            aria-describedby="button-addon2"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        {suggestions.length > 0 && (
                            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        className="cursor-pointer p-2 hover:bg-gray-200 text-black"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </form>
                </div>
                    
                <div className="relative flex items-center">
                    <a className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2" href={"/dashboard-user"}>
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

                    {isAuthenticated ? (
                        <button className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2" onClick={closeSession}>
                            Cerrar sesión
                        </button>
                    ) : (
                        <a className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2" onClick={login}>
                            <button>
                                Login
                            </button>
                        </a>
                    )}
                </div>
            </div>
        </nav>
    );
}
