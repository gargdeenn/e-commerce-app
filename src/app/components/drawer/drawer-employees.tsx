import { useState } from "react";

interface DrawerProps {
    children: React.ReactNode;
    toggleDrawer: () => void
    name: string
    isOpen: boolean
}

const DrawerEmployees: React.FC<DrawerProps> = ({ children, name = '', toggleDrawer, isOpen }) =>   {


    return <>
        <div>
            <a href="#" className="fixed right-0 top-0 m-4 text-white" onClick={toggleDrawer}>

            </a>

            {isOpen && (
                <div
                className="fixed top-0 left-0 w-full h-full bg-black flex items-end justify-center text-white opacity-80 z-30" 
                onClick={toggleDrawer}
                >
                    Haga clic por fuera para cerrar.
                </div>
            )}

            <div className={`fixed left-0 top-0 z-40 h-full w-64 bg-gray-800 duration-500 ease-in-out transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4">
                    <h1 className="text-2xl font-bold text-white">{ name }</h1>
                    {children}
                </div>
            </div>
        </div>
    </>
}

export default DrawerEmployees