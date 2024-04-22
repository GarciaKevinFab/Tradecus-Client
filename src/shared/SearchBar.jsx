import React,{useRef} from "react"; 
import './search-bar.css';
import { Col, Form, FormGroup } from "reactstrap";

import { BASE_URL } from './../utils/config';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchBar = () => {

    const locationRef = useRef('');
    const durationRef = useRef('0');
    const maxGroupSizeRef = useRef('0');
    const navigate = useNavigate();


    const searchHandler = async () => {
        const location = locationRef.current.value;
        const duration = durationRef.current.value;
        const maxGroupSize = maxGroupSizeRef.current.value;
    
        if(location === ''|| duration === '' || maxGroupSize === ''){
            return toast.error('¡Todos los campos son obligatorios!');
        }
    
        const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?city=${location}&duration=${duration}&maxGroupSize=${maxGroupSize}`);
    
        if(!res.ok) toast.error('algo salió mal');
    
        const result = await res.json();
    
        navigate(`/tours/search?city=${location}&duration=${duration}&maxGroupSize=${maxGroupSize}`, {state: result.data});
    };
    

    return (
    <Col lg='12'>
        <div className="search__bar">
            <Form className="d-flex align-items-center gap-4">

                <FormGroup className="d-flex gap-3 form__group form__group-fast">  
                    <span>
                        <i className="ri-map-pin-line"></i>
                    </span>
                        <div>
                            <h6>Ubicación</h6>
                            <input type="text" placeholder="A dónde vas?" ref={locationRef} />
                        </div>
                </FormGroup>

                <FormGroup className="d-flex gap-3 form__group form__group-fast">  
                    <span>
                        <i className="ri-map-pin-time-line"></i>
                    </span>
                        <div>
                            <h6>Duración</h6>
                            <input type="number" placeholder="Duración en horas" ref={durationRef} />
                        </div>
                </FormGroup>

                <FormGroup className="d-flex gap-3 form__group form__group-last">  
                    <span>
                    <i className="ri-group-line"></i>
                    </span>
                        <div>
                            <h6>Máximo de Personas</h6>
                            <input type="number" placeholder="0" ref={maxGroupSizeRef} />
                        </div>
                </FormGroup>

                <span className="search__icon" type='submit' onClick={searchHandler}>
                    <i className="ri-search-line"></i>
                </span>
            </Form>
        </div>
    </Col>
    );
};

export default SearchBar;
