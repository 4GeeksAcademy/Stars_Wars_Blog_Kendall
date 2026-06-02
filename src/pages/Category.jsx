import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const Item = ({ item }) => {
    const { dispatch } = useGlobalReducer()
    const displayNombre = item.name || item.title || item.properties?.title
    return (
        <li key={item.uid} className="list-group-item d-flex align-items-center gap-3 justify-content-between">
            <div className="d-flex align-items-center gap-3">
                {displayNombre}
                <span className="badge bg-primary rounded-pill">ID: {item.uid}</span>
            </div>
            <i className="fa-solid fa-heart text-danger fs-5" role="button"
                onClick={() => dispatch({ type: 'ADD_FAVORITE', payload: { uid: item.uid, name: displayNombre } })}
            />
        </li>
    );
};

export const Category = () => {
    const { store, dispatch } = useGlobalReducer()
    const { type } = useParams();
    const [data, setData] = useState([]);
    const [nextPage, setNextPage] = useState({
        next: null,
        previous: null,
        page: 1
    });

    useEffect(() => {
        setNextPage({
            next: null,
            previous: null,
            page: 1
        })
    }, [type]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/${type}?page=${nextPage.page}&limit=10`)
                if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`) }
                const data = await response.json()

                const listaObtenida = data.results || data.result || []

                setData(Array.isArray(listaObtenida) ? listaObtenida : [listaObtenida])

                setNextPage(prev => ({
                    ...prev,
                    next: data.next || null,
                    previous: data.previous || null
                }))
                console.log(data.results)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [type, nextPage.page]);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">{type.toUpperCase()}</h1>
            <ul className="list-group">
                {data.length === 0 ? (
                    <div className="text-muted text-center">Cargando o no hay datos disponibles...</div>
                ) : (
                    data.map((item) => (
                        <Item key={item.uid} item={item} />
                    ))
                )}
            </ul>

            {type !== "films" && (
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <button className="btn btn-secondary mt-3"
                        disabled={!nextPage.previous}
                        onClick={() => setNextPage(prev => ({ ...prev, page: prev.page - 1 }))}
                    >
                        Previous
                    </button>

                    <span className="text-muted mt-3 fw-bold">Página {nextPage.page}</span>

                    <button className="btn btn-secondary mt-3"
                        disabled={!nextPage.next}
                        onClick={() => setNextPage(prev => ({ ...prev, page: prev.page + 1 }))}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>

    )
}