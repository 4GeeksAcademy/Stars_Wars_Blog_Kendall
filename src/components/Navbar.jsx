import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();

	return (
		<nav className="navbar bg-body-tertiary">
			<div className="container">
				<div className="d-flex align-items-center">
					<Link className="navbar-brand" to="/">
						<i className="fa-brands fa-empire fs-1"></i>
					</Link>
					<Link to={-1} className="btn btn-link text-decoration-none text-dark p-0 ms-2">
						<i className="fa-solid fa-angle-left me-1"></i>Back
					</Link>
				</div>

				<div className="dropdown">
					<button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Favorites <span className="badge bg-secondary ms-1">{store.favorites.length}</span>
					</button>
					<ul className="dropdown-menu dropdown-menu-end" style={{ minWidth: "220px" }}>
						{store.favorites.length === 0 ? (
							<li className="px-3 py-2 text-muted small text-center">No favorites yet</li>
						) : (
							store.favorites.map((favorite) => (
								<li key={favorite.uid} className="d-flex align-items-center justify-content-between px-3 py-1 border-bottom border-light">

									{/* 🟢 CAMBIO: Redirige usando el name que guardamos en favorite.uid */}
									<Link className="dropdown-item text-truncate p-0 me-2" to={`/description/${favorite.type}/${favorite.uid}`}>
										{favorite.name}
									</Link>

									<button
										className="btn btn-link text-danger p-0 border-0"
										onClick={() => dispatch({ type: 'REMOVE_FAVORITE', payload: { uid: favorite.uid } })}
									>
										<i className="fa-solid fa-trash"></i>
									</button>
								</li>
							))
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};