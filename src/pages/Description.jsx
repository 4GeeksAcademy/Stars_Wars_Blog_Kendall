import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export const Description = () => {
    const { type, id } = useParams();
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    const imgBig = 'https://images.unsplash.com/photo-1626326990892-06e053949b26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fHN0YXIlMjB3YXJzfGVufDB8fDB8fHww';

    useEffect(() => {
        const fetchDetail = async () => {
            const categorias = ["people", "planets", "vehicles"];
            const categoriaReal = type && categorias.includes(type) ? type : null;
            const urlBase = 'https://www.swapi.tech/api/';

            try {
                setLoading(true);

                if (categoriaReal) {
                    const response = await fetch(`${urlBase}${categoriaReal}/${id}`);
                    if (response.ok) {
                        const data = await response.json();
                        setDetail(data.result.properties);
                    }
                } else {
                    for (const cat of categorias) {
                        const response = await fetch(`${urlBase}${cat}/${id}`);
                        if (response.ok) {
                            const data = await response.json();
                            if (data.result) {
                                setDetail(data.result.properties);
                                break;
                            }
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching detail:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [type, id]);

    if (loading) {
        return (
            <div className="container text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (!detail) {
        return <div className="container text-center py-5">No se encontraron detalles.</div>;
    }

    return (
        <div className="container py-5">
            <div className="row bg-dark text-light p-4 rounded shadow align-items-center mb-4">
                <div className="col-md-5 mb-4 mb-md-0">
                    <img src={imgBig} className="img-fluid rounded w-100 object-fit-cover shadow" style={{ maxHeight: "450px" }} alt={detail.name} />
                </div>
                <div className="col-md-7 px-lg-5">
                    <h1 className="display-4 text-warning mb-2">{detail.name}</h1>
                    <p className="text-muted italic mb-4">Información oficial de los archivos imperiales de Star Wars.</p>
                    <p className="lead text-light-50 fs-5">
                        Explora los registros históricos detallados para este elemento de la galaxia. Cada especificación técnica y biológica ha sido recuperada directamente desde la base de datos central de la HoloNet.
                    </p>
                    <Link to="/" className="btn btn-outline-warning mt-3">
                        <i className="fa-solid fa-arrow-left me-2"></i>Volver al Inicio
                    </Link>
                </div>
            </div>

            <div className="row g-4 text-dark">
                {detail.gender && (
                    <div className="col-6 col-md-4 col-lg-2 text-center">
                        <div className="bg-light p-3 rounded shadow-sm border-top border-warning border-3 h-100">
                            <span className="text-muted d-block small text-uppercase fw-bold">Género</span>
                            <span className="fs-5 text-capitalize">{detail.gender}</span>
                        </div>
                    </div>
                )}
                {detail.height && (
                    <div className="col-6 col-md-4 col-lg-2 text-center">
                        <div className="bg-light p-3 rounded shadow-sm border-top border-warning border-3 h-100">
                            <span className="text-muted d-block small text-uppercase fw-bold">Altura</span>
                            <span className="fs-5">{detail.height} cm</span>
                        </div>
                    </div>
                )}
                {detail.mass && (
                    <div className="col-6 col-md-4 col-lg-2 text-center">
                        <div className="bg-light p-3 rounded shadow-sm border-top border-warning border-3 h-100">
                            <span className="text-muted d-block small text-uppercase fw-bold">Peso</span>
                            <span className="fs-5">{detail.mass} kg</span>
                        </div>
                    </div>
                )}
                {detail.hair_color && (
                    <div className="col-6 col-md-4 col-lg-2 text-center">
                        <div className="bg-light p-3 rounded shadow-sm border-top border-warning border-3 h-100">
                            <span className="text-muted d-block small text-uppercase fw-bold">Cabello</span>
                            <span className="fs-5 text-capitalize">{detail.hair_color}</span>
                        </div>
                    </div>
                )}
                {detail.skin_color && (
                    <div className="col-6 col-md-4 col-lg-2 text-center">
                        <div className="bg-light p-3 rounded shadow-sm border-top border-warning border-3 h-100">
                            <span className="text-muted d-block small text-uppercase fw-bold">Piel</span>
                            <span className="fs-5 text-capitalize">{detail.skin_color}</span>
                        </div>
                    </div>
                )}
                {detail.birth_year && (
                    <div className="col-6 col-md-4 col-lg-2 text-center">
                        <div className="bg-light p-3 rounded shadow-sm border-top border-warning border-3 h-100">
                            <span className="text-muted d-block small text-uppercase fw-bold">Nacimiento</span>
                            <span className="fs-5">{detail.birth_year}</span>
                        </div>
                    </div>
                )}

                {detail.climate && (
                    <div className="col-6 col-md-4 col-lg-2 text-center">
                        <div className="bg-light p-3 rounded shadow-sm border-top border-info border-3 h-100">
                            <span className="text-muted d-block small text-uppercase fw-bold">Clima</span>
                            <span className="fs-5 text-capitalize">{detail.climate}</span>
                        </div>
                    </div>
                )}
                {detail.terrain && (
                    <div className="col-6 col-md-4 col-lg-2 text-center">
                        <div className="bg-light p-3 rounded shadow-sm border-top border-info border-3 h-100">
                            <span className="text-muted d-block small text-uppercase fw-bold">Terreno</span>
                            <span className="fs-5 text-capitalize">{detail.terrain}</span>
                        </div>
                    </div>
                )}
                {detail.population && (
                    <div className="col-6 col-md-4 col-lg-2 text-center">
                        <div className="bg-light p-3 rounded shadow-sm border-top border-info border-3 h-100">
                            <span className="text-muted d-block small text-uppercase fw-bold">Población</span>
                            <span className="fs-5">{detail.population}</span>
                        </div>
                    </div>
                )}
                {detail.diameter && (
                    <div className="col-6 col-md-4 col-lg-2 text-center">
                        <div className="bg-light p-3 rounded shadow-sm border-top border-info border-3 h-100">
                            <span className="text-muted d-block small text-uppercase fw-bold">Diámetro</span>
                            <span className="fs-5">{detail.diameter} km</span>
                        </div>
                    </div>
                )}
                {detail.gravity && (
                    <div className="col-6 col-md-4 col-lg-2 text-center">
                        <div className="bg-light p-3 rounded shadow-sm border-top border-info border-3 h-100">
                            <span className="text-muted d-block small text-uppercase fw-bold">Gravedad</span>
                            <span className="fs-5">{detail.gravity}</span>
                        </div>
                    </div>
                )}
                {detail.orbital_period && (
                    <div className="col-6 col-md-4 col-lg-2 text-center">
                        <div className="bg-light p-3 rounded shadow-sm border-top border-info border-3 h-100">
                            <span className="text-muted d-block small text-uppercase fw-bold">Año Orbital</span>
                            <span className="fs-5">{detail.orbital_period} d</span>
                        </div>
                    </div>
                )}

                {detail.model && (
                    <div className="col-6 col-md-4 col-lg-2 text-center">
                        <div className="bg-light p-3 rounded shadow-sm border-top border-success border-3 h-100">
                            <span className="text-muted d-block small text-uppercase fw-bold">Modelo</span>
                            <span className="fs-5 text-truncate d-block">{detail.model}</span>
                        </div>
                    </div>
                )}
                {detail.vehicle_class && (
                    <div className="col-6 col-md-4 col-lg-2 text-center">
                        <div className="bg-light p-3 rounded shadow-sm border-top border-success border-3 h-100">
                            <span className="text-muted d-block small text-uppercase fw-bold">Clase</span>
                            <span className="fs-5 text-capitalize text-truncate d-block">{detail.vehicle_class}</span>
                        </div>
                    </div>
                )}
                {detail.cost_in_credits && (
                    <div className="col-6 col-md-4 col-lg-2 text-center">
                        <div className="bg-light p-3 rounded shadow-sm border-top border-success border-3 h-100">
                            <span className="text-muted d-block small text-uppercase fw-bold">Precio</span>
                            <span className="fs-5">{detail.cost_in_credits} 🪙</span>
                        </div>
                    </div>
                )}
                {detail.length && (
                    <div className="col-6 col-md-4 col-lg-2 text-center">
                        <div className="bg-light p-3 rounded shadow-sm border-top border-success border-3 h-100">
                            <span className="text-muted d-block small text-uppercase fw-bold">Largo</span>
                            <span className="fs-5">{detail.length} m</span>
                        </div>
                    </div>
                )}
                {detail.passengers && (
                    <div className="col-6 col-md-4 col-lg-2 text-center">
                        <div className="bg-light p-3 rounded shadow-sm border-top border-success border-3 h-100">
                            <span className="text-muted d-block small text-uppercase fw-bold">Pasajeros</span>
                            <span className="fs-5">{detail.passengers}</span>
                        </div>
                    </div>
                )}
                {detail.max_atmosphering_speed && (
                    <div className="col-6 col-md-4 col-lg-2 text-center">
                        <div className="bg-light p-3 rounded shadow-sm border-top border-success border-3 h-100">
                            <span className="text-muted d-block small text-uppercase fw-bold">Velocidad</span>
                            <span className="fs-5">{detail.max_atmosphering_speed} km/h</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};