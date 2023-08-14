import React, { useRef, useContext } from "react";

import { Container, Row, Col, Nav, Navbar } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaUser, FaSignOutAlt,FaSpinner } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';

import "../../styles/header.css";
import { Store } from "../../Store";


const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },

  {
    path: "/blogs",
    display: "Blog",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const menuRef = useRef(null);
  const {state , dispatch : ctxDispatch} = useContext(Store);
  const {userInfo,token} = state;
  const navigate = useNavigate();

  const signoutHandler = () => {
  
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    navigate("/");
   
  }
  
  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  return (
    
    <header className="header">
      {/* ============ header top ============ */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6" style={{display: 'flex'}}>
              <div className="header__top__left" >
                <span>Need Help?</span>
                <span className="header__top__help">
                  <i class="ri-phone-fill"></i> +1-202-555-0149
                </span>
              </div>
            </Col>

            {
              token ? (

                <Col lg="6" md="6" sm="6">
                 <div className="drp-dwn">

                 <Dropdown>
                  <Dropdown.Toggle  id="user_profile"
                  className="btn-primary" >
                  <FaUserCircle size={"25px"} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                  <Dropdown.Header>
                  Signed in as
                  <br />
                  <b>{userInfo.name}</b>
                </Dropdown.Header>

                <Dropdown.Divider />
                <Dropdown.Item href="/Profile"> <FaUser className="me-2" /> Profile </Dropdown.Item>
                <Dropdown.Item onClick={signoutHandler}> <FaSignOutAlt className="icon-md me-2" /> Log Out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                 </div>
                </Col>
                
                ) :(

                  <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                <Link to="/sign-in" className=" d-flex align-items-center gap-1">
                  <i class="ri-login-circle-line"></i> Login
                </Link>

                <Link to="/sign-up" className=" d-flex align-items-center gap-1">
                  <i class="ri-user-line"></i> Register
                </Link>
              </div>
            </Col>
             
            )
            }

            

          </Row>
        </Container>
      </div>

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <i class="ri-car-line"></i>
                    <span>
                      Rent Car <br /> Service
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Bangladesh</h4>
                  <h6>Sylhet City, Bangladesh</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Sunday to Friday</h4>
                  <h6>10am - 7pm</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className="header__btn btn ">
                <Link to="/contact">
                  <i class="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="nav__right">
              <div className="search__box">
                <input type="text" placeholder="Search" />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
