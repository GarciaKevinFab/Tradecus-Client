import React from 'react'
import ServiceCard from './ServiceCard';
import { Col } from "reactstrap";

import weatherImg from '../assets/images/weather.png';
import guideImg from '../assets/images/guide.png';
import customizationImg from '../assets/images/weather.png';

const servicesData = [
    {
        imgUrl: weatherImg,
        title: "Clima Pronosticado",
        desc: "Proporcionamos información actualizada sobre el clima para ayudarte a planificar tu viaje de manera eficiente y asegurarte de que estés preparado para las condiciones climáticas.",
    },
    {
        imgUrl: guideImg,
        title: "Mejor Guía Turístico",
        desc: "Nuestros guías turísticos están bien versados en la historia, cultura y geografía de los destinos que visitamos, asegurándote una experiencia de viaje enriquecedora y educativa.",
    },
    {
        imgUrl: customizationImg,
        title: "Personalización",
        desc: "Entendemos que cada viajero es único. Por lo tanto, ofrecemos opciones de personalización para adaptar nuestros tours a tus preferencias y necesidades individuales.",
    },
]

const ServiceList = () => {
    return (
    <>
        {servicesData.map((item, index) => (
            <Col lg="3" md='6' sm='12' className='mb-4' key={index}>
                <ServiceCard item={item} />
            </Col>
        ))}
    </>
    );
};

export default ServiceList;