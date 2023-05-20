import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


export const Navbar = () => {
	// Existe el token JWT en el localStorage?
	const [tokenExists, setTokenExists] = useState(false);
	const [updateFlag, setUpdateFlag] = useState(false);
	const [loggedUserEmail, setLoggedUserEmail] = useState('');

	const navigate = useNavigate();

	const handleForceUpdate = () => {
		setUpdateFlag(!updateFlag);
	};
	useEffect(() => {
		const token = localStorage.getItem("miTokenJWT");
		const loggedUserEmail = localStorage.getItem("loggedUserEmail");

		if (token) {
			setTokenExists(true);
			setLoggedUserEmail(loggedUserEmail);

		} else {
			setTokenExists(false);
			setLoggedUserEmail('');
		}
	});

	const handleLogout = () => {
		localStorage.removeItem("miTokenJWT");
		localStorage.removeItem("loggedUserEmail");

		setTokenExists(false);
		navigate('/');
		handleForceUpdate();
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">CatGallery</span>
				</Link>

				<div className="ml-auto d-flex gap-3">
					{/** Voy a mostrar unos botones u otros en función de si tengo el token. Dicho de otro modo, mi aplicación  cliente React no debe mostrar la misma información a un usuario que dispone el token de otro que no.  Esto es importante de entender: no es Flask que nos está diciendo lo que debemos mostrar o no. Es React quién lo decide.   */}
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
							<Link to="/my-cats">
								<button className="btn btn-primary">Mis Gatos</button>
							</Link>
							<Link to="/new-cat">
								<button className="btn btn-primary">Añadir Gato</button>
							</Link>
							<button className="btn btn-primary" onClick={handleLogout}>
								Logged as {loggedUserEmail}- Logout
							</button>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};
