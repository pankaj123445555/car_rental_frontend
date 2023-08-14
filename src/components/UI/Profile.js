import React, {useEffect, useState , useContext, useReducer} from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Spinner } from 'react-bootstrap';
import '../../styles/profile.css'
import axiosInstance from '../../utils/axiosUtil';
import { Store } from '../../Store';
import {editReducer} from '../../reducers/CommonReducer'

import { Container } from "reactstrap";

import Helmet from '../Helmet/Helmet';
import CommonSection from './CommonSection';
import CarItem from './CarItem';
import carData from '../../assets/data/carData';


function Profile() {

    const {state} = useContext(Store);
    const {token} = state;
    const [{loading,error},dispatch] = useReducer(editReducer, {
      loading : false,
    })
    const [values , setValues] = useState({
        email : "",
        password : "",
        address : "",
        city : "",
        state : "",
        zip : "",
        name : "",
        age : ""
    })

    const handleChange = (e) => {
        setValues({...values , [e.target.name]: e.target.value})
    }

    // function to fetch the details of a user
    const fetchDetails = async() => {

    const{ data} = await axiosInstance.get('/api/user/find-user',{
        headers: { Authorization: `${token}` },
      })
      
      setValues({
        name : data?.user?.name,
        email :  data?.user?.email,
        password :  data?.user?.password,
        address :  data?.user?.address,
        city :  data?.user?.city,
        state :  data?.user?.state,
        zip :  data?.user?.zip,
        age :  data?.user?.age,
      })

    }

    // function invoke when user update his profile
    const handleSubmit = async(e) => {
      
      e.preventDefault();
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const{ data} = await axiosInstance.patch('/api/user/update-user',values,{
          headers : {Authorization : `${token}`}
        })
        dispatch({ type: "FETCH_SUCCESS" });
      }
      catch(error)
      {
          dispatch({
            type: "FETCH_FAIL",
            payload: error,
          });
      }
     
    }
    useEffect(()=>{
      
     fetchDetails();

    
    },[])
  return (
       <div>
         <div className='make-div-column alg-itm'>
         <div className='form-component'>
         <div className='profile-header font-heading'>
         <span> 1. </span>
         <span> EDIT YOUR ACCOUNT INFORMATION</span>
         </div>
         <div className='make-div-column pds-1 light-border-bottom'>
         <span className='font-heading'>MY ACCOUNT INFORMATION</span>
         <span className='light-font'>Your Personal Details</span>
         </div>
         <div className='pds-1'>

         <Form onSubmit={handleSubmit}>

         <Row className="mb-3">
            <Form.Group as={Col} >
              <Form.Label>Name</Form.Label>
              <Form.Control value={values?.name} onChange={handleChange} type="text" placeholder="Enter name" name = 'name' />
            </Form.Group>
    
            <Form.Group as={Col} >
              <Form.Label>age</Form.Label>
              <Form.Control value={values?.age} onChange={handleChange}  placeholder="age" name = 'age' />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control value={values?.email} onChange={handleChange} type="email" placeholder="Enter email" name = 'email' />
            </Form.Group>
    
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control  onChange={handleChange} type="password" placeholder="Password" name = 'password' />
            </Form.Group>
          </Row>
    
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control value={values?.address} onChange={handleChange} placeholder="1234 Main St" name = 'address' />
          </Form.Group>
    
    
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control value={values?.city} onChange={handleChange} name = 'city' />
            </Form.Group>
    
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Select value={values?.state} onChange={handleChange} defaultValue="Choose..." name = 'state'>
                <option>Choose...</option>
                <option>mp</option>
                <option>up</option>
              </Form.Select>
            </Form.Group>
    
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control value={values?.zip} onChange={handleChange} name = 'zip' />
            </Form.Group>
          </Row>
    
          <Row className='make-div-row just-cont-cent pds-1'>
          {
            loading? (
              <Button id='upd-btn' variant="primary">
              <Spinner animation="border" variant="light" />
          </Button>
            ): (
              <Button id='upd-btn' variant="primary" type="submit">
              Update
            </Button>
            )
          }
          
          </Row>
        </Form>
         </div>   
         </div>

        
         </div>
       </div>
      );

}

export default Profile
