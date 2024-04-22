import React from "react";
import '../styles/home.css';
import { Container, Row, Col } from 'reactstrap';
import heroImg from '../assets/images/hero-img01.webp';
import heroImg02 from '../assets/images/hero-img02.webp';
import herovideo from '../assets/images/hero-video.mp4';
import worldImg from '../assets/images/world.png';
import experienceImg from '../assets/images/experience.png';
import Subtitle from '../shared/Subtitle';
import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import FeaturedtourList from "../components/Featured-tours/FeaturedtourList";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";
import Testimonials from "../components/Testimonial/Testimonials";
import Newsletter from "../shared/Newsletter";

const Home = () => {
    return (
        <>
            {/* ================ hero section start ================ */}
            <section>
                <Container>
                    <Row>
                        <Col lg='6'>
                            <div className="hero__content">
                                <div className="hero__subtitle d-flex align-items-center">
                                    <Subtitle subtitle={'Saber Antes De Ir'} />
                                    <img src={worldImg} alt="" />
                                </div>
                                <h1>Viajar abre la puerta a la creación de<span
                                    className="highlight"> recuerdos </span> </h1>
                                <p>Descubra nuevos horizontes, experimente culturas únicas y cree recuerdos 
                                    inolvidables con nuestros tours personalizados. Somos su compañero de viaje 
                                    ideal, comprometidos a hacer de su viaje una experiencia extraordinaria.
                                </p>
                            </div>
                        </Col>

                        <Col lg='2'>
                            <div className="hero__img-box">
                                <img src={heroImg} alt="" />
                            </div>
                        </Col>

                        <Col lg='2'>
                            <div className="hero__img-box hero__video-box mt-4">
                                <video src={herovideo} alt="" controls />
                            </div>
                        </Col>

                        <Col lg='2'>
                            <div className="hero__img-box mt-5">
                                <img src={heroImg02} alt="" />
                            </div>
                        </Col>

                        <SearchBar />
                    </Row>
                </Container>
            </section>
            {/* ================ hero section start ================ */}
            <section>
                <Container>
                    <Row>
                        <Col lg='3'>
                            <h5 className="services__subtitle">Nuestros Servicios</h5>
                            <h2 className="services__title">Ofrecemos Los Mejores Servicios</h2>
                        </Col>
                        <ServiceList />
                    </Row>
                </Container>
            </section>
            {/* ================ featured tour section start ================ */}
            <section>
                <Container>
                    <Row>
                        <Col lg='12' className="mb-5">
                            <Subtitle subtitle={'Explorar'} />
                            <h2 className="featured__tour-title">Tours Destacados</h2>
                        </Col>
                        <FeaturedtourList />
                    </Row>
                </Container>
            </section>
            {/* ================ featured tour section end ================ */}

            {/* ================ experience section start ================ */}
            <section>
                <Container>
                    <Row>
                        <Col lg='6'>
                            <div className="experience__content">
                                <Subtitle subtitle={'Experiencia'} />

                                <h2>
                                Nuestra Experiencia, <br /> Le Ofrecemos
                                </h2>
                                <p>
                                    Con más de 7 años de experiencia en la industria del turismo, 
                                    nuestra misión es proporcionar experiencias de viaje excepcionales. 
                                    Somos apasionados de los viajes y trabajamos continuamente para mejorar 
                                    nuestros servicios y ofrecer a nuestros clientes las mejores experiencias.
                                    <br /> Nuestra dedicación y compromiso con la satisfacción del cliente nos 
                                    han permitido servir a más de:
                                </p>
                            </div>

                            <div className="counter__wrapper d-flex align-items-center gap-5">
                                <div className="counter__box">
                                    <span>12k+</span>
                                    <h6>Viajes Exitosos</h6>
                                </div>
                                <div className="counter__box">
                                    <span>2k+</span>
                                    <h6>Clientes Regulares</h6>
                                </div>
                                <div className="counter__box">
                                    <span>7</span>
                                    <h6>Años de Experiencia</h6>
                                </div>
                            </div>
                        </Col>
                        <Col lg='6'>
                            <div className="experience__img">
                                <img src={experienceImg} alt="" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* ================ experience section end ================ */}

            {/* ================ gallery section start ================ */}
            <section>
                <Container>
                    <Row>
                        <Col lg='12'>
                            <Subtitle subtitle={'Galeria'} />
                            <h2 className="gallery__title">
                            Galería de Viajes de Clientes
                            </h2>
                        </Col>

                        <Col lg='12'>
                            <MasonryImagesGallery />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* ================ gallery section end ================ */}

            {/* ================ testimonial section start ================ */}
                <section>
                    <Container>
                        <Row>
                            <Col lg='12'>
                                <Subtitle subtitle={'A Nuestros Clientes les gusta'} />
                                <h2 className="testimonial__title">
                                Reseñas de Nuestros Clientes 
                                </h2>
                            </Col>

                            <Col lg={'12'}>
                                <Testimonials />
                            </Col>
                        </Row>
                    </Container>
                </section>
            {/* ================ testimonial section end ================ */}
            <Newsletter />
        </>
    );
};

export default Home;