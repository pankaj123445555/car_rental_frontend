import React, { useEffect, useState, useContext, useReducer } from "react";
import { Container, Row, Form, Col, Button, Spinner } from "react-bootstrap";
import { Link} from "react-router-dom";
import '../../styles/add.css'
import axiosInstance from "../../utils/axiosUtil";
import { Store } from "../../Store";

import { editReducer } from "../../reducers/CommonReducer";

const SignIn = () => {
  
  const{ dispatch : ctxdispatch}= useContext(Store);
 const [isFetching, setisFetching] = useState(false);
 const [values,setValues] = useState({
  email : "",
  password : ""
 });

 const [{loading,error}, dispatch] = useReducer(editReducer , {
  loading : false,
  error : ""
 })

 const handleChange = (e) =>
 {
   setValues({...values, [e.target.name] : e.target.value})
 }

 const handleSubmit = async(e) => {
     e.preventDefault();

     try {
      dispatch({ type: "FETCH_REQUEST" });

      const {data}= await axiosInstance.post('/api/user/login',values);
      if (data.token) {
        console.log(data);
        ctxdispatch({ type: "USER_SIGNIN", payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        dispatch({ type: "FETCH_SUCCESS" });
      }
      else
      {
        // show error
      }
       
     }
     catch(error)
     {
         console.log(error);
        dispatch({
          type: "FETCH_FAIL",
          payload: error,
        });
     }
     
 }

  return (
    <>
       
          <Container className="pt-5 px-3 px-md-0 f-center flex-column wt-500">
            <div className="f-center mb-4">
              <Link to="/home/sign-in" className="toggle-link-item active-link">
                Login
              </Link>
              <Link to="/sign-up" className="toggle-link-item">
                Register
              </Link>
            </div>
            <div className="form-box">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3"></Form.Group>
                {loading ? (
                  <Button variant="dark" size="lg" disabled>
                    <Spinner animation="border" variant="light" />
                  </Button>
                ) : (
                  <Button type="submit" variant="dark">
                    Submit
                  </Button>
                )}
              </Form>
            </div>
          </Container>
    </>
  );
};

export default SignIn;
