import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/about.css";
import teamImg from "../assets/images/teamImg.webp";
import logo from "../assets/images/logo.png";
import CommonSection from "../shared/CommonSection";

// Componente para el título de cada sección
const SectionTitle = ({ title }) => (
    <Row>
        <Col>
            <h3>{title}</h3>
        </Col>
    </Row>
);

const About = () => {
    return (
        <React.Fragment>
            <CommonSection title={'Sobre Nosotros'} />

            <section className="about__content">
                <Container>
                    <Row>
                        <Col md="6">
                            <SectionTitle title='VISION' />
                            <p>
                                Convertirnos en el operador
                                turístico líder en la región que brinda servicios de
                                viajes excelentes e innovadores a nuestros clientes.
                            </p>
                        </Col>
                        <Col md="6">
                            <SectionTitle title='MISION' />
                            <p>
                                Brindar una experiencia de viaje única para todos de
                                una manera sostenible, honesta y transparente.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="about__values">
                <Container>
                    <h2>Nuestros Valores</h2>
                    <Row>
                        <Col md="4">
                            <SectionTitle title='Pasión por los Viajes:' />
                            <p>
                                No somos solo un negocio, sino un grupo de entusiastas de los
                                viajes que sienten pasión por explorar y compartir la belleza y
                                la rica historia de Cusco con el mundo.
                            </p>
                        </Col>
                        <Col md="4">
                            <SectionTitle title='Enfoque en el Cliente:' />
                            <p>
                                Nuestros clientes están en el corazón de todo lo que hacemos. Nos
                                esforzamos por proporcionar servicios excepcionales que satisfacen y
                                superan las expectativas de nuestros clientes, asegurando que tengan
                                una experiencia inolvidable cuando elijan viajar con nosotros.
                            </p>
                        </Col>
                        <Col md="4">
                            <SectionTitle title='Turismo Sostenible:' />
                            <p>
                                Como custodios del rico patrimonio de Cusco, creemos en la promoción de
                                prácticas de turismo sostenible que protejan y preserven nuestro medio
                                ambiente y las comunidades locales para que las generaciones futuras puedan
                                disfrutarlas.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="about__team">
                <Container>
                    <h2>Nuestro Equipo</h2>
                    <Row>
                        <Col>
                            <img src={teamImg} alt="Nuestro equipo" />
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="about__history">
                <Container>
                    <Row>
                        <Col md="6">
                            <h2>Nuestra Historia</h2>

                            <p>
                                TRADECUS SRL nació el 26 de junio de 2015, fruto de un sueño de
                                acercar las maravillas de Cusco a viajeros de todo el mundo.
                                Desde su inicio, la empresa se registró como Sociedad Comercial de
                                Responsabilidad Limitada (SOC.COM.RESPONS. LTDA.), comprometida con
                                el ejercicio de prácticas comerciales responsables y éticas.
                                Nuestra sede se ubica en el corazón de Cusco, en AV. CIRCUNVALACION MZA.
                                A LOTE. 5 URB. GUADALUPE (cerca de REST. KANKA C1P AZUL), un lugar que nos
                                permite estar cerca de las rutas más importantes de la ciudad. Comenzamos
                                como un equipo pequeño pero ferviente, unido por la pasión por los viajes y
                                el profundo amor por nuestra ciudad y su cultura. Con el paso de los años,
                                TRADECUS SRL ha crecido y se ha expandido, convirtiéndose en un referente
                                para los turistas que buscan una experiencia auténtica y memorable en Cusco.
                                Hoy, TRADECUS SRL es reconocida por su dedicación y servicio excepcional,
                                siempre dispuesta a ir más allá para garantizar que nuestros visitantes
                                descubran la verdadera esencia de Cusco. A través de nuestras diversas ofertas
                                de viajes, hemos logrado que miles de personas vivan la magia de esta ciudad
                                histórica, creando recuerdos que durarán toda la vida.
                            </p>
                        </Col>
                        <Col md="6">
                            <img src={logo} alt="Nuestra historia" />
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
};

export default About;
