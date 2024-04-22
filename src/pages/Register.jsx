import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import registerImg from '../assets/images/register.png';
import userIcon from '../assets/images/user.png';
import { AuthContext } from './../context/AuthContext';
import { BASE_URL } from './../utils/config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {

    const [credentials, setCredentials] = useState({
        username: undefined,
        email: undefined,
        password: undefined
    });

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = e => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const handleClick = async e => {
        e.preventDefault();

        try {
            const res = await fetch(`${BASE_URL}/usermobile/register`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const result = await res.json();

            if (res.status === 400) {
                // This is a duplicate user error
                toast.error(result.message);
            } else if (!res.ok) {
                // Other errors
                toast.error("El nombre de usuario o correo electrónico ya existen.");
            } else {
                // Success
                dispatch({ type: "REGISTER_SUCCESS" });
                navigate("/login");
            }

        } catch (err) {
            toast.error("Ha ocurrido un error. Por favor intente de nuevo.");
        }
    };


    return (
        <section>
            <Container>
                <Row>
                    <Col lg='8' className="m-auto">
                        <div className="login__container d-flex justify-content-between">
                            <div className="login__img">
                                <img src={registerImg} alt="" />
                            </div>

                            <div className="login__form">
                                <div className="user">
                                    <img src={userIcon} alt="" />
                                </div>

                                <h2>Registrarte</h2>

                                <Form onSubmit={handleClick}>
                                    <FormGroup>
                                        <input type="text" placeholder="Nombre de Usuraio" required id="username"
                                            onChange={handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <input type="email" placeholder="Email" required id="email"
                                            onChange={handleChange} />
                                    </FormGroup>
                                    <FormGroup className="position-relative">
                                        <input type={passwordShown ? "text" : "password"} placeholder="Contraseña" required id="password" onChange={handleChange} className="form-control" />
                                        <i onClick={togglePasswordVisibility} className="position-absolute top-50 end-0 translate-middle-y" style={{ cursor: 'pointer', marginRight: '10px' }}>{passwordShown ? <FaEye /> : <FaEyeSlash />}</i>
                                    </FormGroup>

                                    <Button className="btn secondary__btn auth__btn" type="submit">
                                        Registrarte
                                    </Button>
                                </Form>
                                <p>¿Ya tienes una cuenta? <Link to='/login'>Ingresar</Link></p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Register;