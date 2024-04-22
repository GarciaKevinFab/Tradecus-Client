import React from 'react';
import Slider from 'react-slick';

const Testimonials = () => {

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,

        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ]

    }

    return (

        <Slider {...settings}>
            <div className="testimonial py-4 px-3">
                <p>"Maravillosa atención. Las ofertas que ofrecen son súper
                    buenas, un gran profesional que se adapta a las necesidades
                    de su cliente. En resumen 100% recomendable. Gracias!"
                </p>
                <div className="d-flex align-items-center gap-4 mt-3">
                    <div>
                        <h6 className="mb-0 mt-3">Carlos Mendoza</h6>
                        <p>Cliente</p>
                    </div>
                </div>
            </div>

            <div className="testimonial py-4 px-3">
                <p>"Un servicio de primera y súper puntual. Solicité una partida
                    de nacimiento que requería para una gestión en el Consulado y
                    me la prometieron para dentro de tres semanas y justo en tres
                    semanas exactas tuve la partida. Altamente satisfecho."
                </p>
                <div className="d-flex align-items-center gap-4 mt-3">
                    <div>
                        <h6 className="mb-0 mt-3">Maria Fernanda</h6>
                        <p>Cliente</p>
                    </div>
                </div>
            </div>

            <div className="testimonial py-4 px-3">
                <p>"Tuvimos muy buena experiencia con TRADECUS SRL!!! Hemos hecho un
                    viaje inolvidable a Cusco y ya con ganas de repetirlo!. Gracias por
                    la atención, sin duda la recomiendo TRADECUS SRL."
                </p>
                <div className="d-flex align-items-center gap-4 mt-3">
                    <div>
                        <h6 className="mb-0 mt-3">Jose Perez</h6>
                        <p>Cliente</p>
                    </div>
                </div>
            </div>

            <div className="testimonial py-4 px-3">
                <p>"Excelente trato, muy seguro mi viaje a Cusco con ellos. Recomendados 
                    100%"
                </p>
                <div className="d-flex align-items-center gap-4 mt-3">
                    <div>
                        <h6 className="mb-0 mt-3">Ana Lopez</h6>
                        <p>Cliente</p>
                    </div>
                </div>
            </div>
        </Slider>

    );
};

export default Testimonials;