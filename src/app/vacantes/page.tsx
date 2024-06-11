import VacantesComponent from "../components/vacantes/page";

export default function VacantesPage() {
    return (
        <>
            <h1 className="text-center text-black text-3xl font-bold my-12">Vacantes</h1>
            <VacantesComponent cantidadVacantes={100} />
        </>
    );
}