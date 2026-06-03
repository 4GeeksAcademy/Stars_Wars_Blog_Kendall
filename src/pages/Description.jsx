import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const validTypes = ["people", "planets", "films", "vehicles", "starships"];

export const Description = () => {
    const { id, type } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        if (!type || !id) {
            setError("La ruta debe ser /description/:type/:id. Ejemplo: /description/people/2");
            setData(null);
            return;
        }

        if (!validTypes.includes(type)) {
            setError("Tipo inválido. Usa people, planets, films, vehicles o starships.");
            setData(null);
            return;
        }

        setError(null);

        const fetchData = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/${type}/${id}`)
                if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`) }
                const data = await response.json()
                setData(data.result.properties)
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("No se pudo cargar la descripción. Verifica la categoría y el ID.");
            }
        }
        fetchData();
    }, [id, type]);


    if (error) {
        return (
            <div className="container" style={{ maxWidth: "500px", marginTop: "40px" }}>
                <div className="alert alert-warning text-center">
                    {error}
                </div>
                <div className="text-center mt-3">
                    <Link to="/" className="btn btn-primary">
                        Volver al inicio
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container" style={{ maxWidth: "500px", marginTop: "40px" }}>
            <h1 className="text-center mb-4 text-capitalize">Detalle de {type}</h1>

            {!data ? (
                <div className="text-center text-muted mt-3">
                    <div className="spinner-border spinner-border-sm text-secondary me-2" role="status"></div>
                    Cargando especificaciones...
                </div>
            ) : (
                <div id="ficha" className="card shadow-sm">
                    <div className="card-body">

                        <h3 id="nombre" className="card-title border-bottom pb-2 mb-3 text-dark fw-bold">
                            {data.name}
                        </h3>

                        <dl className="row mb-0">

                            {type === "films" && (
                                <>
                                    <dt className="col-6 text-muted fw-normal">Título :</dt>
                                    <dd className="col-6 text-end small">{data.title}</dd>

                                    <dt className="col-6 text-muted fw-normal">Episodio:</dt>
                                    <dd className="col-6 text-end fw-bold text-warning">{data.episode_id}</dd>
                                    

                                    <dt className="col-6 text-muted fw-normal">Director:</dt>
                                    <dd className="col-6 text-end">{data.director}</dd>

                                    <dt className="col-6 text-muted fw-normal">Productor(es):</dt>
                                    <dd className="col-6 text-end small">{data.producer}</dd>

                                    <dt className="col-6 text-muted fw-normal">Fecha de estreno:</dt>
                                    <dd className="col-6 text-end">{data.release_date}</dd>

                                    {/* Resumen o Texto Introductorio */}
                                    <dt className="col-12 text-muted fw-normal border-top pt-2 mt-3 text-center text-uppercase small">Opening Crawl</dt>
                                    <dd className="col-12 text-center text-warning fst-italic small bg-dark p-3 rounded mt-2 border border-secondary" style={{ maxHeight: "150px", overflowY: "auto" }}>
                                        "{data.opening_crawl}"
                                    </dd>

                                    {/* Estadísticas de colecciones secundarias de la película */}
                                    <dt className="col-6 text-muted fw-normal border-top pt-2 mt-3">Personajes en escena:</dt>
                                    <dd className="col-6 text-end border-top pt-2 mt-3 fw-bold text-info">
                                        {data.characters ? data.characters.length : 0}
                                    </dd>

                                    <dt className="col-6 text-muted fw-normal">Planetas visitados:</dt>
                                    <dd className="col-6 text-end fw-bold text-success">
                                        {data.planets ? data.planets.length : 0}
                                    </dd>

                                    <dt className="col-6 text-muted fw-normal">Especies presentes:</dt>
                                    <dd className="col-6 text-end fw-bold text-danger">
                                        {data.species ? data.species.length : 0}
                                    </dd>
                                </>
                            )}


                            {type === "people" && (
                                <>
                                    <dt className="col-6 text-muted fw-normal">Género:</dt>
                                    <dd className="col-6 text-end text-capitalize fw-bold">{data.gender}</dd>

                                    <dt className="col-6 text-muted fw-normal">Año de nacimiento:</dt>
                                    <dd className="col-6 text-end">{data.birth_year}</dd>

                                    <dt className="col-6 text-muted fw-normal">Altura:</dt>
                                    <dd className="col-6 text-end">{data.height} cm</dd>

                                    <dt className="col-6 text-muted fw-normal">Peso / Masa:</dt>
                                    <dd className="col-6 text-end">{data.mass} kg</dd>

                                    <dt className="col-6 text-muted fw-normal">Color de ojos:</dt>
                                    <dd className="col-6 text-end text-capitalize">{data.eye_color}</dd>

                                    <dt className="col-6 text-muted fw-normal">Color de cabello:</dt>
                                    <dd className="col-6 text-end text-capitalize">{data.hair_color}</dd>

                                    <dt className="col-6 text-muted fw-normal">Color de piel:</dt>
                                    <dd className="col-6 text-end text-capitalize">{data.skin_color}</dd>
                                </>
                            )}


                            {type === "planets" && (
                                <>
                                    <dt className="col-6 text-muted fw-normal">Clima:</dt>
                                    <dd className="col-6 text-end text-capitalize">{data.climate}</dd>

                                    <dt className="col-6 text-muted fw-normal">Terreno:</dt>
                                    <dd className="col-6 text-end text-capitalize">{data.terrain}</dd>

                                    <dt className="col-6 text-muted fw-normal">Población:</dt>
                                    <dd className="col-6 text-end">{data.population}</dd>

                                    <dt className="col-6 text-muted fw-normal">Diámetro:</dt>
                                    <dd className="col-6 text-end">{data.diameter} km</dd>

                                    <dt className="col-6 text-muted fw-normal">Gravedad:</dt>
                                    <dd className="col-6 text-end">{data.gravity}</dd>

                                    <dt className="col-6 text-muted fw-normal">Período Orbital:</dt>
                                    <dd className="col-6 text-end">{data.orbital_period} días</dd>
                                </>
                            )}


                            {(type === "vehicles" || type === "starships") && (
                                <>
                                    <dt className="col-6 text-muted fw-normal">Modelo:</dt>
                                    <dd className="col-6 text-end small">{data.model}</dd>

                                    <dt className="col-6 text-muted fw-normal">Clase de nave:</dt>
                                    <dd className="col-6 text-end text-capitalize">{data.vehicle_class || data.starship_class}</dd>

                                    <dt className="col-6 text-muted fw-normal">Fabricante:</dt>
                                    <dd className="col-6 text-end small">{data.manufacturer}</dd>

                                    <dt className="col-6 text-muted fw-normal">Costo en créditos:</dt>
                                    <dd className="col-6 text-end text-warning fw-bold">{data.cost_in_credits}</dd>

                                    <dt className="col-6 text-muted fw-normal">Tripulación:</dt>
                                    <dd className="col-6 text-end">{data.crew}</dd>

                                    <dt className="col-6 text-muted fw-normal">Pasajeros:</dt>
                                    <dd className="col-6 text-end">{data.passengers}</dd>

                                    <dt className="col-6 text-muted fw-normal">Velocidad Máxima ATM:</dt>
                                    <dd className="col-6 text-end">{data.max_atmosphering_speed}</dd>
                                </>
                            )}


                            <dt className="col-6 text-muted fw-normal border-top pt-2 mt-2">Películas de la saga:</dt>
                            <dd className="col-6 text-end border-top pt-2 mt-2 fw-bold text-primary">
                                {data.films ? data.films.length : 0}
                            </dd>

                            {type === "people" && (
                                <>
                                    <dt className="col-6 text-muted fw-normal">Vehículos asignados:</dt>
                                    <dd className="col-6 text-end fw-bold text-success">
                                        {data.vehicles ? data.vehicles.length : 0}
                                    </dd>

                                    <dt className="col-6 text-muted fw-normal">Naves espaciales:</dt>
                                    <dd className="col-6 text-end fw-bold text-danger">
                                        {data.starships ? data.starships.length : 0}
                                    </dd>
                                </>
                            )}

                        </dl>
                    </div>
                </div>
            )}
        </div>
    )
}