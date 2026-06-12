import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const CardData = ({ items }) => {
    const imgDefault = 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHN0YXIlMjB3YXJzfGVufDB8fDB8fHww';

    if (!items || items.length === 0) {
        return <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    }

    return (
        <div className="d-flex flex-row overflow-auto gap-3 pb-3">
            {items.map((item, index) => (
                <div key={index} className="my-2 flex-shrink-0">
                    <div className="card" style={{ width: "300px" }}>
                        <img src={imgDefault} className="card-img-top" alt={item.name} />

                        <div className="card-body d-flex flex-column justify-content-between">
                            <h5 className="card-title text-truncate">{item.name}</h5>

                            <p className="card-text text-muted small">
                                {item.gender && `Género: ${item.gender}`}
                                {item.climate && `Clima: ${item.climate}`}
                                {item.model && `Modelo: ${item.model}`}
                            </p>

                            <Link to="/details" className="btn btn-primary w-100 mt-2">
                                Ver detalles
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const Home = () => {

    const [data, setData] = useState({
        people: [],
        planets: [],
        vehicles: []
    })
    const types = ["people", "planets", "vehicles"]
    const url = 'https://www.swapi.tech/api/'
    const { store, dispatch } = useGlobalReducer()

    useEffect(() => {
        const fetchData = async () => {
            for (const type of types) {
                try {
                    const response = await fetch(url + type)
                    if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`) }
                    const { results } = await response.json()

                    const promesas = results.map(item =>
                        fetch(`${url}${type}/${item.uid}`)
                            .then(res => {
                                if (!res.ok) throw new Error();
                                return res.json();
                            })
                            .then(data => data.result.properties)
                            .catch(() => null)
                    )

                    const resultadosDetalles = await Promise.all(promesas);
                    const listData = resultadosDetalles.filter(item => item !== null);

                    setData(prevData => ({
                        ...prevData,
                        [type]: listData
                    }))

                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        }
        fetchData()
    }, [])

    return (
        <div className="container d-flex justify-content-center flex-column py-4">
            {types.map((type) => (
                // Agregamos la propiedad 'key' obligatoria de React
                <div key={type} className="mb-5">
                    <h1 className="text-capitalize mb-3">{type}</h1>

                    {/* Pasamos los datos exactos de esa categoría usando data[type] */}
                    <CardData items={data[type]} />
                </div>
            ))}
        </div>
    );
}; 