import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<nav className="navbar bg-body-tertiary">
			<div className="container">
				<Link className="navbar-brand" to="/">
					<i className="fa-brands fa-empire fs-1"></i>
				</Link>
				<div className="dropdown">
					<button className="btn btn-black dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Favorites
					</button>
					<ul className="dropdown-menu">
						{store.favorites.map((favorite) => (
							<li key={favorite.uid}>
								<Link className="dropdown-item" to={`/description/${favorite.uid}`}>
									{favorite.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};