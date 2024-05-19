import classNames from "classnames"
import Image from "next/image"
import StyleCategory from "./category.module.css"

export default function Categories(){
    const callouts = [
            {
            name: 'Escritorio y oficina',
            description: 'Accesorios para trabajar desde casa',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
            imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
            href: '#',
            },
            {
            name: 'Self-Improvement',
            description: 'Journals and note-taking',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
            imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
            href: '#',
            },
            {
            name: 'Travel',
            description: 'Daily commute essentials',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
            imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
            href: '#',
            },
            {
            name: 'Travel',
            description: 'Daily commute essentials',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
            imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
            href: '#',
            },
        ]
        
            return (
            <div className="bg-gray-100" id="categorias">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                    <h2 className="text-2xl font-bold text-blue-950">Categorias</h2>    
        
                    <div className="mt-6 h-full flex justify-center items-center flex-wrap sm:gap-x-6 lg:gap-x-6 lg:space-y-0">     
                    {callouts.map((callout, index) => (
                        <div key={index} className={classNames("relative w-64", [StyleCategory.filterToCategory] )}>
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