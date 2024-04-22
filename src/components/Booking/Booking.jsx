import React, { useState, useContext, useEffect } from "react";
import "./booking.css";
import Payment from "../Payment/Payment.jsx";
import DniField from '../DNI/DniField.jsx';
import LoginModal from "../Login-Modal/LoginModal.jsx";
import { Form, FormGroup, ListGroup, ListGroupItem } from "reactstrap";
import { AuthContext } from "../../context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour, avgRating }) => {
    const { price, reviews, title } = tour;

    const { user } = useContext(AuthContext);

    const [booking, setBooking] = useState({
        userId: user ? user._id : "",
        userEmail: user ? user.email : "",
        tourName: title,
        phone: "",
        guestSize: "1",
        bookAt: "",
    });

    const isValidDate = (date) => {
        const dateObj = new Date(date);
        return dateObj instanceof Date && !isNaN(dateObj);
    }

    const isFutureDate = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);  // reset hours, minutes, seconds and ms
        return new Date(date) >= today;
    }

    const handleBookAtChange = (e) => {
        const value = e.target.value;
        if (!isValidDate(value) || !isFutureDate(value)) {
            toast.error('Por favor ingresa una fecha válida y en el futuro.');
            return;
        }
        setBooking((prev) => ({ ...prev, bookAt: value }));
        toast.success('Fecha de reserva válida.');
    };
    //Eleccion de tour

    const [tourType, setTourType] = useState('group'); // 'group' or 'private'

    const totalAmount =
        Number(price) * (tourType === 'private' ? 4 : 1) * Number(booking.guestSize);


    const handleGuestSizeChange = (e) => {
        const value = Number(e.target.value);

        if (tourType === 'private' && (value < 1 || value > 2)) {
            toast.error('Para un tour privado, el número de personas debe ser entre 1 y 2.');
            return;
        }

        const availableSeats = maxGuests - currentGuests;
        if (value > availableSeats) {
            toast(`Only ${availableSeats} seats left for this tour.`);
            return;
        }

        setBooking((prev) => ({ ...prev, guestSize: value }));
    };



    // Declaramos 'quantity' antes de su uso.
    const [quantity, setQuantity] = useState(1);
    const [dni, setDni] = useState(new Array(1).fill(""));
    const [userData, setUserData] = useState(new Array(1).fill({}));

    useEffect(() => {
        // Si el número de invitados cambia, reiniciar los valores de DNI y userData
        setDni(new Array(booking.guestSize).fill(""));
        setUserData(new Array(booking.guestSize).fill({}));
        setQuantity(booking.guestSize);
    }, [booking.guestSize]);

    const [maxGuests, setMaxGuests] = useState(0);
    const [currentGuests, setCurrentGuests] = useState(0);

    useEffect(() => {
        if (tour && tour._id) {
            // Fetch tour info from API
            axios.get(`${BASE_URL}/tours/${tour._id}`)
                .then(response => {
                    setMaxGuests(response.data.maxGroupSize);
                })
                .catch(error => {
                    toast.error('Ocurrió un error al obtener la información del tour.');
                });

            // Fetch booking count from API
            axios.get(`${BASE_URL}/booking/count/${tour._id}`)
                .then(response => {
                    setCurrentGuests(response.data);
                })
                .catch(error => {
                    toast.error('Ocurrió un error al obtener la cantidad de reservas.');
                });
        }
    }, [tour]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <div className="booking">
            <div className="booking__top d-flex align-items-center justify-content-between">
                <h3>
                    S/.{price} <span>/por persona</span>
                </h3>

                <span className="tour__rating d-flex align-items-center">
                    <i className="ri-star-s-fill"></i>
                    {avgRating === 0 ? null : avgRating} ({reviews?.length})
                </span>
            </div>

            {/*============== booking form ====================*/}
            <div className="booking__form">
                <h5 className="text-center">INFORMACIÓN DE RESERVA</h5>
                <Form className="booking__info-form" onSubmit={(e) => e.preventDefault()}>
                    <FormGroup>
                        <h5>Tipo de tour</h5>
                        <select
                            id="tourType"
                            value={tourType}
                            onChange={(e) => setTourType(e.target.value)}
                        >
                            <option value="group">Tour grupal</option>
                            <option value="private">Tour privado</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <h5>N° de Personas</h5>
                        <input
                            type="number"
                            id="guestSize"
                            required
                            value={booking.guestSize}
                            onChange={handleGuestSizeChange}
                            min="1"
                        />

                    </FormGroup>
                    <FormGroup>
                        <input
                            type="number"
                            placeholder="Telefono"
                            id="phone"
                            required
                            onChange={(e) => setBooking((prev) => ({ ...prev, phone: e.target.value }))}
                            />
                    </FormGroup>
                    <FormGroup className="d-flex align-items-center gap-3">
                        <input
                            type="date"
                            placeholder=""
                            id="bookAt"
                            required
                            onChange={handleBookAtChange}
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </FormGroup>

                    {/*Agregar campos de DNI*/}
                    {quantity > 0 && [...Array(quantity)].map((_, i) => (
                        <DniField
                            key={i}
                            index={i}
                            dni={dni} // Aquí pasamos el array completo en lugar de un valor individual
                            setDni={setDni}
                            userData={userData} // Aquí también pasamos el array completo
                            setUserData={setUserData}
                        />
                    ))}
                </Form>
            </div>
            {/*============== booking end ====================*/}

            {/*============== booking botton ====================*/}
            <div className="booking__botton">
                <ListGroup>
                    <ListGroupItem className="border-0 px-0">
                        <h5 className="d-flex align-items-center gap-1">
                            S/.{price} <i className="ri-close-line"></i> 1 persona
                        </h5>
                        <span>S/.{price}</span>
                    </ListGroupItem>
                </ListGroup>

                <ListGroup>
                    <ListGroupItem className="border-0 px-0 total">
                        <h5>Total</h5>
                        <span>S/.{totalAmount}</span>
                    </ListGroupItem>
                </ListGroup>

                {/* Componente de pago de MercadoPago */}
                <Payment
                    tour={tour}
                    quantity={quantity}
                    totalPrice={totalAmount}
                    booking={booking}
                    user={user}
                    handleOpenModal={toggleModal}
                    dni={dni}
                    userData={userData}
                />

            </div>
            {/*============== booking botton  end ====================*/}

            {/*============== Modal ====================*/}
            <LoginModal
                isModalOpen={isModalOpen}
                toggleModal={toggleModal}
            />
            {/*============== Modal end ====================*/}
        </div>
    );
};

export default Booking;
