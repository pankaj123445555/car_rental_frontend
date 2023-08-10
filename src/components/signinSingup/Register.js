import React, { useEffect, useState , useContext, useReducer} from "react";
import { Container, Row, Form, Col, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosUtil";
import { editReducer } from "../../reducers/CommonReducer";

// import "react-toastify/dist/ReactToastify.css";

import '../../styles/add.css'
import { Store } from "../../Store";

const Register = () => {

  const{ dispatch : ctxdispatch}= useContext(Store);
  const navigate = useNavigate();
  useEffect(()=>{
      
    if (localStorage.getItem("token")) {
      navigate("/home");
    }

  },[])

  const [{loading,error}, dispatch] = useReducer(editReducer , {
    loading : false,
    error : ""
   })
  // console.log(state,dispatch);

    const [values, setValues] = useState({
      name: "",
      email: "",
      phone: "",
      password: "",
    });

    const handleChange = (e) => {
       
      setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = async(e) => {
      e.preventDefault();
      try{
        dispatch({ type: "FETCH_REQUEST" });
        const {data} = await  axiosInstance.post('/api/user/register',values);
        
        if (data.token) {
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
        dispatch({
          type: "FETCH_FAIL",
          payload: error,
        });
      }
     
     
    }

  const [isFetching,setisFetching] = useState(false);
  return (
    <>
       
          <Container className="pt-5 px-3 px-md-0 f-center flex-column wt-500">
            <div className="f-center mb-4">
              <Link to="/sign-in" className="toggle-link-item">
                Login
              </Link>
              <Link to="/sign-up" className="toggle-link-item active-link">
                Register
              </Link>
            </div>
            <div className="form-box">
              <Form onSubmit={handleSubmit}>
                 
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  

                <Form.Group className="mb-3">
                  <Form.Control
                    type="number"
                    name="phone"
                    placeholder="Mobile No."
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

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

                {loading ? (
                  <Button variant="dark" size="lg" disabled>
                    <Spinner animation="border" variant="light" />
                  </Button>
                ) : (
                  <Button type="submit" variant="dark" >
                    Submit
                  </Button>
                )}
              </Form>
            </div>
          </Container>
    </>
    )
                }

export default Register;
