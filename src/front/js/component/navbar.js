import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const [tokenExists, setTokenExists] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("miTokenJWT");
		if (token) {
			setTokenExists(true);
		} else {
			setTokenExists(false);
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("miTokenJWT");
		setTokenExists(false);
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">CatGallery</span>
				</Link>
				<div className="ml-auto d-flex gap-3">
					{!tokenExists && (
						<>
							<Link to="/signup">
								<button className="btn btn-primary">Signup</button>
							</Link>
							<Link to="/login">
								<button className="btn btn-primary">Login</button>
							</Link>
						</>
					)}
					{tokenExists && (
						<>
							<Link to="/mis-gatos">
								<button className="btn btn-primary">Mis Gatos</button>
							</Link>
							<Link to="/anadir-gato">
								<button className="btn btn-primary">Añadir Gato</button>
							</Link>
							<button className="btn btn-primary" onClick={handleLogout}>
								Logout
							</button>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};
