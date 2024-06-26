import React, {useState} from "react"; 
import { Container, Row, Col } from "reactstrap";
import CommonSection from './../shared/CommonSection';
import { useLocation } from "react-router-dom";
import TourCard from './../shared/TourCard';
import Newletter from './../shared/Newsletter';

const SearchResultList = () => {

    const location = useLocation();
    const [data] = useState(location.state);

    return (
    <>
        <CommonSection title={'Resultado de la Busqueda'} />
        <section>
            <Container>
                <Row>
                    {
                        data.length === 0? <h4 className="text-center">No se ha encontrado ningun Tour</h4> : data?.map(tour => 
                        <Col lg='3' className="mb-4" key={tour._id}> <TourCard tour={tour} /> </Col>)
                    }
                </Row>
            </Container>
        </section>
        <Newletter />
    </>
    );
};

export default SearchResultList;