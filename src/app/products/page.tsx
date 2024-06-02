import ProductsComponent from "../components/products/products";

export default function ProductsPage() {
    return (
        <>
            <h1 className="text-center text-black text-3xl font-bold my-12">Productos</h1>
            <ProductsComponent cantidadProductos={5000} />
        </>
    );
}