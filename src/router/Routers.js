import React from "react"; 
import {Routes, Route, Navigate} from 'react-router-dom';

import Home from './../pages/Home';
import Tours from './../pages/Tours';
import Contact from './../pages/Contact';
import TourDetails from './../pages/TourDetails';
import Login from './../pages/Login';
import Register from './../pages/Register';
import SearchResultList from './../pages/SearchResultList';
import ThankYou from "../pages/ThankYou";

import About from "../pages/About";
import GalleryPage from "../pages/Gallery";

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/tours' element={<Tours />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/tours/:id' element={<TourDetails />} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register />} />
            <Route path='/gallery' element={<GalleryPage />} />
            <Route path='/thank-you' element={<ThankYou/>} />
            <Route path='/tours/search' element={<SearchResultList />} />
        </Routes>
    );
};

export default Routers;