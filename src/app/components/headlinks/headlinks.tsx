import { metadata } from '@/app/config/metadata'

const HeadLinks = () =>{
    return <>
        <link rel="shortcut icon" href={"/public/favicon.png"} type="image/x-icon" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
    </>
}


export default HeadLinks