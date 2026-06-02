import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Description = () => {
    const { store, dispatch } = useGlobalReducer()

    return (
        <div className="text-center">
            <h1 className="mt-5">Description</h1>
        </div>
    )
}