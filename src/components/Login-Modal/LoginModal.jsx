import React, { useState, useContext } from "react";
import { Form, FormGroup, Button, Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./LoginModal.css";
import { BASE_URL } from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";  // No olvides importar estos dos

const LoginModal = ({ isModalOpen, toggleModal }) => {
    const navigate = useNavigate();
    const currentURL = window.location.pathname;
    const { dispatch } = useContext(AuthContext);

    const [passwordShown, setPasswordShown] = useState(false);  // Este estado se usa para manejar la visibilidad de la contraseña

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);  // Cambia el estado de passwordShown al valor opuesto
    };

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!credentials.email || !credentials.password) {
            toast.error('Por favor, ingrese su email y contraseña.');
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(credentials),
            });

            const result = await res.json();

            if (!res.ok) {
                let errorMessage = result.message || "Error al iniciar sesión.";
                if (res.status === 401) {
                    errorMessage = "Nombre de usuario o contraseña incorrecta.";
                }
                toast.error(errorMessage);
            } else {
                dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
                toggleModal();
                navigate(currentURL);
            }
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.message });
            toast.error("Ha ocurrido un error de red al iniciar sesión. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <Modal isOpen={isModalOpen} toggle={toggleModal} className="modal__form">
            <ModalBody>
                <button type="button" className="close" onClick={toggleModal}>
                    <span>
                        <i className="ri-close-circle-line"></i>
                    </span>
                </button>
                <h2>Inicion de Sesion</h2>
                <Form className="form-container">
                    <FormGroup className="input-container">
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            id="email"
                            onChange={(e) =>
                                setCredentials({ ...credentials, email: e.target.value })
                            }
                        />
                    </FormGroup>
                    <FormGroup className="input-container password-container">
                        <input
                            type={passwordShown ? "text" : "password"}
                            placeholder="Password"
                            required
                            id="password"
                            onChange={(e) =>
                                setCredentials({ ...credentials, password: e.target.value })
                            }
                        />
                        <i
                            onClick={togglePasswordVisibility}
                            className="toggle-password"
                        >
                            {passwordShown ? <FaEye /> : <FaEyeSlash />}
                        </i>
                    </FormGroup>
                    <Button
                        className="btn primary__btn w-100 mt-4"
                        type="submit"
                        onClick={handleLogin}
                    >
                        Iniciar sesión
                    </Button>
                </Form>

                <p>
                    ¿No tienes una cuenta? <Link to="/register">Registrate</Link>
                </p>
            </ModalBody>
        </Modal>
    );
};

export default LoginModal;
