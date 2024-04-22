import React, { useEffect, useRef, useState, useContext } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "./../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "./../shared/Newsletter";
import useFetch from "./../hooks/useFetch";
import { BASE_URL } from "./../utils/config";
import { AuthContext } from "./../context/AuthContext";
import LoginModal from "../components/Login-Modal/LoginModal.jsx";
import { Oval } from "react-loader-spinner";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from "reactstrap";


const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const { user } = useContext(AuthContext);

  // fetch data from database
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  // destructure properties from tour object
  const {
    photo,
    title,
    desc,
    price,
    reviews,
    city,
    duration,
    maxGroupSize,
  } = tour || {};

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const [selectedRating, setSelectedRating] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 4;  // define how many reviews you want per page

  const totalPages = Math.ceil(reviews?.length / reviewsPerPage);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews?.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => (prev === totalPages ? prev : prev + 1));
  const prevPage = () => setCurrentPage(prev => (prev === 1 ? prev : prev - 1));


  // format date
  const options = { day: "numeric", month: "long", year: "numeric" };

  //Modal 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const handleOpenModal = (e) => {
    if (!user) {
      setIsModalOpen(true);
    }
  };

  // submit request to the server
  const submitHandler = async e => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user || user === undefined || user === null) {
        return handleOpenModal();
      }

      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: selectedRating,
      };

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();
      if (!res.ok) {
        return toast.error(result.message);
      }

      window.location.reload();

    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <>
      <section>
        <Container>
          {loading &&
            <h4 className="text-center pt-5">
              <Oval
                color="#f11c00"
                height={100}
                width={100}
                timeout={3000} //3 secs
              />
            </h4>
          }
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={photo} alt="" />

                  <div className="tour__info">
                    <h2>{title}</h2>

                    <div className="d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i
                          className="ri-star-s-fill"
                          style={{ color: "var(--secondary-color)" }}
                        ></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "Not rated"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>
                      <span>
                      <i className="ri-map-pin-2-line"></i> {city}
                      </span>
                    </div>
                    <div className="tour__extra-details">
                      <span>
                      <i class="ri-price-tag-3-fill"></i> S/.{price}{" "}
                        /por person
                      </span>
                      <span>
                        <i className="ri-map-pin-time-line"></i> {duration} Horas
                      </span>
                      <span>
                        <i className="ri-group-line"></i> {maxGroupSize} personas
                      </span>
                    </div>
                    <h5>Descripcion</h5>
                    <p>{desc}</p>
                  </div>

                  {/* ========== tour reviews section =========== */}
                  <div className="tour__reviews mt-4">
                    <h4>Reseñas ({reviews?.length} reseñas)</h4>

                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        <span onClick={() => setSelectedRating(1)}>1
                          <i
                            className="ri-star-s-fill"
                            style={{
                              color: selectedRating >= 1 ? "var(--secondary-color)" : "black",
                            }}
                          ></i>
                        </span>
                        <span onClick={() => setSelectedRating(2)}>2
                          <i
                            className="ri-star-s-fill"
                            style={{
                              color: selectedRating >= 2 ? "var(--secondary-color)" : "black",
                            }}
                          ></i>
                        </span>
                        <span onClick={() => setSelectedRating(3)}>3
                          <i
                            className="ri-star-s-fill"
                            style={{
                              color: selectedRating >= 3 ? "var(--secondary-color)" : "black",
                            }}
                          ></i>
                        </span>
                        <span onClick={() => setSelectedRating(4)}>4
                          <i
                            className="ri-star-s-fill"
                            style={{
                              color: selectedRating >= 4 ? "var(--secondary-color)" : "black",
                            }}
                          ></i>
                        </span>
                        <span onClick={() => setSelectedRating(5)}>5
                          <i
                            className="ri-star-s-fill"
                            style={{
                              color: selectedRating >= 5 ? "var(--secondary-color)" : "black",
                            }}
                          ></i>
                        </span>
                      </div>

                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="Danos tu opinion"
                          required
                        />
                        <button
                          className="btn primary__btn text-white"
                          type="submit"
                        >
                          Enviar
                        </button>
                      </div>
                    </Form>

                    <ListGroup className="user__reviews">
                      {currentReviews?.map((review, index) => (
                        <div className="review__item" key={index}>
                          <img src={avatar} alt="" />

                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.username}</h5>
                                <p>
                                  {new Date(
                                    review.createdAt
                                  ).toLocaleDateString("es-PE", options)}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                {review.rating}
                                <i className="ri-star-s-fill"></i>
                              </span>
                            </div>

                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>

                    <div className="paginacion">
                      <Button className="btn primary__btn text-white" disabled={currentPage === 1} onClick={prevPage}>
                        Anterior
                      </Button>
                      <span> Página {currentPage} de {totalPages} </span>
                      <Button className="btn primary__btn text-white" disabled={currentPage === totalPages} onClick={nextPage}>
                        Siguiente
                      </Button>
                    </div>
                  </div>
                  {/* ========== tour reviews section end =========== */}

                </div>
              </Col>
              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      {/*============== Modal ====================*/}
      <LoginModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
      />
      {/*============== Modal end ====================*/}
      <Newsletter />
    </>
  );
};

export default TourDetails;
