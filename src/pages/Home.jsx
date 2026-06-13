import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const CardData = ({ items }) => {
    const { store, dispatch } = useGlobalReducer();
    const imgDefault = 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHN0YXIlMjB3YXJzfGVufDB8fDB8fHww';

    if (!items || items.length === 0) {
        return (
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }

    return (
        <div className="d-flex flex-row overflow-auto gap-3 pb-3">
            {items.map((item, index) => {
                const esFavorito = store.favorites.some(fav => fav.uid === item.uid);

                return (
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

                                <div className="d-flex align-items-center gap-2">
                                    <Link to={`/description/${item.type}/${item.uid}`} className="btn btn-outline-primary w-100 mt-2">
                                        Ver detalles
                                    </Link>

                                    <i
                                        className={`${esFavorito ? "fa-solid" : "fa-regular"} fa-heart text-danger fs-5 mt-2`}
                                        role="button"
                                        onClick={() => dispatch({ type: 'ADD_FAVORITE', payload: { uid: item.uid, name: item.name, type: item.type } })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
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

    useEffect(() => {
        const fetchData = async () => {

            const cache = localStorage.getItem("swapi_cache")

            if (cache) {
                const parsedCache = JSON.parse(cache);


                if (parsedCache.people?.length > 0 || parsedCache.planets?.length > 0 || parsedCache.vehicles?.length > 0) {
                    setData(parsedCache);
                    return;
                } else {

                    localStorage.removeItem("swapi_cache");
                }
            }

            let stateCache = {
                people: [],
                planets: [],
                vehicles: []

            }

            for (const type of types) {
                try {
                    const response = await fetch(url + type)
                    if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`) }
                    const { results } = await response.json()

                    const promise = results.map(item =>
                        fetch(`${url}${type}/${item.uid}`)
                            .then(res => {
                                if (!res.ok) throw new Error();
                                return res.json();
                            })
                            .then(data => ({ ...data.result.properties, uid: item.uid, type: type }))
                            .catch(() => null)
                    )

                    const resultadosDetalles = await Promise.all(promise);
                    const listData = resultadosDetalles.filter(item => item !== null);

                    stateCache[type] = listData

                    setData(prevData => ({
                        ...prevData,
                        [type]: listData
                    }))

                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
            localStorage.setItem("swapi_cache", JSON.stringify(stateCache))
        }
        fetchData()
    }, [])

    return (
        <div className="container d-flex justify-content-center flex-column py-4">
            {types.map((type) => (

                <div key={type} className="mb-5">
                    <h1 className="text-capitalize mb-3">{type}</h1>

                    <CardData items={data[type]} />
                </div>
            ))}
        </div>
    );
}; 