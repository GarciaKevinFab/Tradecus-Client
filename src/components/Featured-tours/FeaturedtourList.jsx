import React from 'react'
import TourCard from '../../shared/TourCard';
import { Col } from 'reactstrap';

import useFetch from './../../hooks/useFetch';
import { BASE_URL } from './../../utils/config';

import { Oval } from "react-loader-spinner";

const FeaturedtourList = () => {

  const { data: featuredTours, loading, error } = useFetch(
    `${BASE_URL}/tours/search/getFeaturedTours`
  );

  return (
    <>
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
      {error && <h4>{error}</h4>}
      {!loading &&
        !error &&
        featuredTours?.map(tour => (
          <Col lg='3' md='6' sm='6' className='mb-4' key={tour._id}>
            <TourCard tour={tour} />
          </Col>
        ))}
    </>
  );
};

export default FeaturedtourList;