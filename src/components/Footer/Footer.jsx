import React from "react";
import './footer.css';

import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const quick__links = [
    {
        path: '/about',
        display: 'Acerca de'
    },
    {
        path: '/tour',
        display: 'Tour'
    },
    {
        path: "/Contact",
        display: "Contacto",
    },
];

const quick__links2 = [
    {
        path: '/gallery',
        display: 'Galeria'
    },
    {
        path: '/login',
        display: 'Login'
    },
    {
        path: '/register',
        display: 'Register'
    },
];


const Footer = () => {

    const year = new Date().getFullYear()

    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col lg='3'>
                        <div className="logo">
                            <img src={logo} alt="" />
                            <p>Agencia de viajes dedicada a ofrecer experiencias 
                                turísticas inolvidables y personalizadas.
                            </p>
                        </div>
                    </Col>

                    <Col lg='3'>
                        <h5 className="footer__link-title">Explorar</h5>
                        <ListGroup className="footer__quick-links">
                            {
                                quick__links.map((item, index) => (
                                    <ListGroupItem key={index} className='ps-0 border-0'>
                                        <Link to={item.path}>{item.display}</Link>
                                    </ListGroupItem>
                                ))}
                        </ListGroup>
                    </Col>

                    <Col lg='3'>
                        <h5 className="footer__link-title">Recursos</h5>
                        <ListGroup className="footer__quick-links">
                            {
                                quick__links2.map((item, index) => (
                                    <ListGroupItem key={index} className='ps-0 border-0'>
                                        <Link to={item.path}>{item.display}</Link>
                                    </ListGroupItem>
                                ))}
                        </ListGroup>
                    </Col>
                    <Col lg='3'>
                        <h5 className="footer__link-title">Contacto</h5>
                        <ListGroup className="footer__quick-links">
                            <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                                <h6 className="mb-0 d-flex align-items-center gap-2">
                                    <span><i className="ri-map-pin-line"></i></span>
                                    <p className="mb-0">Av. Circunvalación Mz. A Lt. 5</p>
                                </h6>
                            </ListGroupItem>

                            <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                                <h6 className="mb-0 d-flex align-items-center gap-2">
                                    <span><i className="ri-mail-line"></i></span>
                                    Email:
                                    <p className="mb-0">info@toursagency.com
</p>
                                </h6>
                            </ListGroupItem>

                            <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                                <h6 className="mb-0 d-flex align-items-center gap-2">
                                    <span><i className="ri-phone-line"></i></span>
                                    Telefono:
                                    <p className="mb-0">+51 989470354</p>
                                </h6>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>

                    <Col lg='12' className="text-center pt-5">
                        <p className="copyright">
                            Copyright © {year}, diseñado y desarrollado por IContinental. Todos los derechos reservados.</p>
                    </Col>

                </Row>
            </Container>
        </footer>
    );
};

export default Footer;