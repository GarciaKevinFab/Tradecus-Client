import React, { useState } from "react";
import "../styles/contact.css";
import { Container, Row, Col } from "reactstrap";
import { BASE_URL } from "../utils/config";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowMessage(false);

    // Validaciones
    if (!name || !email || !message) {
      toast.error('Por favor, rellene todos los campos.');
      return;
    }

    // Validar formato del correo electrónico
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      toast.error('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    const response = await fetch(`${BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await response.json();

    if (response.ok) {
      // Aquí puedes manejar una respuesta exitosa (por ejemplo, mostrar un mensaje de éxito)
      toast.success(data.message);
    } else {
      // Aquí puedes manejar una respuesta de error (por ejemplo, mostrar un mensaje de error)
      toast.error(data.message);
    }

  };
  return (
    <section className="contact">
      <Container>
        <Row>
          <Col lg="6">
            <div className="contact__content">
              <h2 className="contact__title">Contáctanos</h2>
              <p className="contact__description">
                ¡Nos encantaría saber de ti! Utiliza el formulario de contacto
                a continuación para enviarnos un mensaje y nos pondremos en
                contacto contigo lo antes posible.
              </p>

              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nombre</label>
                  <input type="text" id="name" required onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Correo electrónico</label>
                  <input type="email" id="email" required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Mensaje</label>
                  <textarea id="message" rows="4" required onChange={(e) => setMessage(e.target.value)}></textarea>
                </div>
                <button className="contact__submit" type="submit">
                  Enviar mensaje
                </button>
                {showMessage && <div style={{ color: 'green', marginTop: '20px' }}>Tu mensaje ha sido enviado con éxito. Nos pondremos en contacto contigo pronto.</div>}
              </form>

            </div>
          </Col>
          <Col lg="6">
            <div className="contact__info">
              <h2 className="contact__title">Información de contacto</h2>
              <p className="contact__info-text">
                Si tienes alguna pregunta o necesitas más información, no dudes
                en contactarnos.
              </p>
              <ul className="contact__details">
                <li>
                  <i className="ri-map-pin-2-line"></i> Dirección:
                  Av. Circunvalación Mz. A Lt. 5 , PE-CUSCO
                </li>
                <li>
                  <i className="ri-phone-line"></i> Teléfono: +51 989470354
                </li>
                <li>
                  <i className="ri-mail-line"></i> Correo electrónico: info@toursagency.com
                </li>
              </ul>
            </div>
            <iframe
              title="Mapa de la ubicación"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242.45615857554748!2d-71.95843885851725!3d-13.517261808267513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x916dd606b4251db5%3A0x6ff900f79cbd938d!2sTradecus%20Tours!5e0!3m2!1ses-419!2spe!4v1685170352631!5m2!1ses-419!2spe"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
