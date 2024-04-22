import React, { useState } from 'react';
import './newsletter.css';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import maleTourist from '../assets/images/male-tourist.png';
import { BASE_URL } from "../utils/config";

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post(`${BASE_URL}/subscribe`, { email });
            setMessage('¡Gracias por suscribirte!');
            setEmail('');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Si el correo ya está suscrito, el servidor debería devolver un mensaje adecuado
                setMessage(error.response.data.message);
            } else {
                setMessage('Algo salió mal. Inténtalo de nuevo.');
            }
        }
        
    };

    return (
        <section className='newsletter'>
            <Container>
                <Row>
                    <Col lg='6'>
                        <div className="newsletter__content">
                            <h2>
                                Suscríbete para recibir Ofertas.
                            </h2>
                            <div className="newsletter__input">
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="email"
                                        placeholder='Ingrese su email'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <button className="btn newsletter__btn" type="submit">Suscribir</button>
                                </form>
                            </div>
                            {message && <p className="newsletter__message">{message}</p>}
                        </div>
                    </Col>

                    <Col lg='6'>
                        <div className="newsletter__img">
                            <img src={maleTourist} alt="" />
                        </div>
                    </Col>

                </Row>
            </Container>
        </section>
    );
};

export default Newsletter;
