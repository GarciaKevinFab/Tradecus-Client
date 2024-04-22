import React from 'react';
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery.jsx';
import { Container, Row, Col } from 'reactstrap';
import CommonSection from "../shared/CommonSection";

const GalleryPage = () => {
  return (
    <>
      {/* ================ gallery section start ================ */}
      <section>
        <Container>
          <Row>
            <div style={{ marginBottom: "2rem" }}>
            <CommonSection title={'Nuestra Galería de Viajes de Clientes'} />
            </div>
            <Col lg='12'>
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>
      {/* ================ gallery section end ================ */}
    </>
  );
};

export default GalleryPage;
