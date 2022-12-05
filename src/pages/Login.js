import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap'
import Helmet from '../Helmet/Helmet'
import "../styles/login.css";
import {signInWithEmailAndPassword} from "firebase/auth";

import { auth } from "../firebase.config";

import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
   const navigate = useNavigate();
   const signInSubmit = async (e) => {
     e.preventDefault();
     setLoading(true);
     try {
       const userCredential = await signInWithEmailAndPassword(auth, email, password);
       const user = userCredential.user;
      
       
       setLoading(false);
       toast.success("Successfully Login");
       navigate("/checkout");
     } catch (error) {
       setLoading(false);
       toast.error("Incorrect Email or Password");
     }
   };
  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5 className="text-center fw-bold">Loading...</h5>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fs-4 fw-bold">Login</h3>
                <Form className="auth__form" onSubmit={signInSubmit}>
                  <FormGroup className="form__group">
                    <input
                      type="email"
                      name=""
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="password"
                      name=""
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  <button type="submit" className="buy__btn auth__btn">
                    Login
                  </button>
                  <p>
                    Don't Have Account?<Link to="/signup">Create an Account</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default Login