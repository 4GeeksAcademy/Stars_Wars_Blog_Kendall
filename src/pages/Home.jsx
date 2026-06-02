import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	

	return (
		<div className="text-center mt-5">

			<div className="btn-group" role="group" aria-label="Categories">
				<Link to={"/category/films"} className="btn btn-lg btn-dark text-primary">Films</Link>
				<Link to={"/category/people"} className="btn btn-lg btn-dark text-danger">Character</Link>
				<Link to={"/category/planets"} className="btn btn-lg btn-dark text-primary">Planets</Link>
				<Link to={"/category/species"} className="btn btn-lg btn-dark text-danger">Species</Link>
				<Link to={"/category/starships"} className="btn btn-lg btn-dark text-primary">Starships</Link>
				<Link to={"/category/vehicles"} className="btn btn-lg btn-dark text-danger">Vehicles</Link>
			</div>
		</div>
	);
}; 