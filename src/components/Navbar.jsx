import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<nav className="navbar bg-body-tertiary">
			<div className="container">
				<div className="d-flex align-items-center">
				<Link className="navbar-brand" to="/">
					<i className="fa-brands fa-empire fs-1"></i>
				</Link>
				<i className="fa-solid fa-angle-left">Back</i>
				</div>
				<div className="dropdown">
					<button className="btn btn-black dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Favorites
					</button>
					<ul className="dropdown-menu">
						{store.favorites.map((favorite) => (
							<li key={`${favorite.type}-${favorite.uid}`} className="d-flex align-items-center justify-content-between px-3 py-1 border-bottom border-light">

								
								<Link className="dropdown-item text-truncate p-0 me-2" to={`/description/${favorite.type}/${favorite.uid}`}>
									{favorite.name}
								</Link>

		
								<button
									className="btn btn-link text-danger p-0 border-0"
									onClick={() => dispatch({ type: 'DELETE_FAVORITE', payload: { uid: favorite.uid, type: favorite.type } })}
								>
									<i className="fa-solid fa-trash"></i>
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};