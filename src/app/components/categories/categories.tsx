import classNames from "classnames"
import Image from "next/image"
import StyleCategory from "./category.module.css"
import FashionComponent from "../../fashion/page"

export default function Categories(){
    const callouts = [
        {
            name: 'Electrónica',
            description: 'Accesorios para trabajar desde casa',
            imageSrc: '/mohammadreza-alidoost-0rUp9vgyEYo-unsplash.jpg',
            imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
            href: '/electronic',
        },
        {
            name: 'Moda',
            description: 'Prendas a la moda',
            imageSrc: '/katsiaryna-endruszkiewicz-BteCp6aq4GI-unsplash.jpg',
            imageAlt: 'Prendas a la moda',
            href: '/fashion',
        },
        {
            name: 'Hogar',
            description: 'Todo para llenar de alegría a tu hogar',
            imageSrc: '/outsite-co-R-LK3sqLiBw-unsplash.jpg',
            imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
            href: '/hogar',
        },
        {
            name: 'Deportes',
            description: 'Para esos momentos inolvidables',
            imageSrc: '/connor-coyne-OgqWLzWRSaI-unsplash.jpg',
            imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
            href: '/sports',
        },
        {
            name: 'Juguetes',
            description: 'Donde puedes ver a tu hijo feliz',
            imageSrc: '/nong-iad87c3bgwU-unsplash.jpg',
            imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
            href: '/toys',
        },
    ]
        
            return (
                <div className="bg-gray-100" id="categorias">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                    <h2 className="text-2xl font-bold text-blue-950">Categorias</h2>    
        
                    <div className="mt-6 h-full flex justify-center items-center flex-wrap sm:gap-x-6 lg:gap-x-6 lg:space-y-0">     
                    {callouts.map((callout, index) => (
                        <div key={index} className={classNames("relative w-44", [StyleCategory.filterToCategory] )}>
                        <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 sm:h-64">
                            <Image
                            src={callout.imageSrc}
                            alt={callout.imageAlt}
                            width={400}
                            height={400}
                            className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <h3 className="mt-6 text-sm text-gray-500">
                            <a href={callout.href}>
                            <span className="absolute inset-0" />
                            {callout.name}
                            </a>
                        </h3>
                        <p className="text-base font-semibold text-gray-900">{callout.description}</p>
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            </div>
            )
}