import React, {useEffect, useState , useContext, useReducer} from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Spinner } from 'react-bootstrap';
import '../styles/profile.css'
import axiosInstance from '../utils/axiosUtil';
import { Store } from '../Store';
import {editReducer} from '../reducers/CommonReducer'

import { Container } from "reactstrap";
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import CarItem from '../components/UI/CarItem';
import carData from '../assets/data/carData';



const BookingHistory = () => {

    useEffect(()=>{

        console.log('useEffect called');

    },[])

    return (
        <div className='make-div-row just-cont-cent booking-car-component'>
        <div className = 'bkd-car'>
        <div style = {{color : 'brown'}} className = 'font-heading make-div-row just-cont-cent'>
        <span>YOU'R BOOKING HISTORY</span>
        </div>
        <Helmet title="Cars">
     <section>
       <Container>
         <Row>
           <Col lg="12">
             <div className=" d-flex align-items-center gap-3 mb-5">
               <span className=" d-flex align-items-center gap-2">
                 <i class="ri-sort-asc"></i> Sort By
               </span>

               <select>
                 <option>Select</option>
                 <option value="low">Low to High</option>
                 <option value="high">High to Low</option>
               </select>
             </div>
           </Col>

           {carData.map((item) => (
             <CarItem item={item} key={item.id} />
           ))}
         </Row>
       </Container>
     </section>
   </Helmet>
        </div>
        </div>
    )
}

export default BookingHistory;
