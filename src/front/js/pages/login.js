import { useState } from "react";
import React from "react";
import { useNavigate } from 'react-router-dom';


export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginError, setLoginError] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Ejercicio 3: En este fetch hay dos errores que impiden enviar correctamente el usuario y la contraseña al servidor Flask. 
            // Solamente hay que modificar dos líneas para resolverlo

            const response = await fetch(process.env.BACKEND_URL + "/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                setLoginSuccess(true);
                setLoginError(false);
                const data = await response.json();
                const token = data.token; // asumiendo que el token se devuelve como propiedad "token" en la respuesta JSON

                localStorage.setItem("miTokenJWT", token);

                setEmail('');
                setPassword('');
                navigate('/')
            } else {
                setLoginSuccess(false);
                setLoginError(true);
            }
        } catch (error) {
            console.error("Error:", error);
            setLoginSuccess(false);
            setLoginError(true);
        }
    };

    return (
        <div>
            {loginSuccess && (
                <div className="alert alert-success" role="alert">
                    ¡Login correcto!
                </div>
            )}
            <h1>Formulario de login</h1>


            {loginError && (
                <div className="alert alert-danger" role="alert">
                    Login incorrecto
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};
