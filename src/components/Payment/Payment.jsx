import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { BASE_URL } from "../../utils/config";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Payment = ({ tour, quantity, totalPrice, booking, user, handleOpenModal, dni, userData }) => {
  const [initPoint, setInitPoint] = useState(null);

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^9[0-9]{8}$/;
    return phoneNumberRegex.test(phoneNumber);
  }

  useEffect(() => {
    const createPaymentPreference = async () => {
      try {
        const response = await fetch(`${BASE_URL}/mercadopago/create_payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product: {
              id: tour._id,
              title: tour.title, // Asegúrate de que el título del tour se pase aquí
              unit_price: tour.price
            },
            quantity: parseInt(quantity, 10),
            unitPrice: tour.price, // Agrega esto
            totalPrice,
            guests: userData // Aquí estás enviando los nombres y apellidos de los invitados a tu servidor/API
          }),
        });
        if (!response.ok) {
          throw new Error("Error al crear la preferencia de pago de MercadoPago");
        }
        const data = await response.json();
        setInitPoint(data.init_point);
      } catch (error) {
        console.error(error.message);
      }
    };

    createPaymentPreference();
  }, [tour, quantity, totalPrice, userData]);

  const handlePayment = async () => {
    try {
      if (!user || user === undefined || user === null) {
        return handleOpenModal(); // Abre el modal de inicio de sesión si el usuario no ha iniciado sesión
      }
      if (dni.some((val) => val === "") || userData.some((data) => Object.keys(data).length === 0)) {
        toast.error("Por favor, completa todos los campos de DNI y nombre.");
        return;
      }

      // Phone number validation
      if (!isValidPhoneNumber(booking.phone.toString())) {
        toast.error('Por favor ingresa un número de teléfono válido.');
        return;
      }
      toast.success('Número de teléfono válido.');

      // Verifica si todos los campos requeridos están llenos
      if (
        !booking.phone ||
        !booking.bookAt ||
        !booking.guestSize
      ) {
        return toast.error("Por favor, completa todos los campos requeridos.");
      }

      // Guarda la información de reserva en la base de datos aquí

      if (initPoint) {
        window.open(initPoint, "_blank");
      }

    } catch (err) {
      toast.error(err.message);
    }
  };



  return (
    <div className="payment">
      <Button
        className="btn primary__btn w-100 mt-4"
        onClick={handlePayment}
        disabled={!initPoint}
      >
        COMPRAR
      </Button>
    </div>
  );
};

export default Payment;
