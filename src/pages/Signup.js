import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import Helmet from "../Helmet/Helmet";
import "../styles/login.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc,doc } from "firebase/firestore";
import { auth,  } from "../firebase.config"
import { db } from "../firebase.config";
import {storage } from "../firebase.config";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
   const [file, setFile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const signUpSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user;
      const storageRef = ref(storage, `images/${Date.now()+name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on((error) => {
        toast.error(error.message)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          //update user profile
         await updateProfile(user, {
            displayName: name,
            photoURL: downloadURL
         })
          //store user
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName: name,
            email,
            photoURL: downloadURL,
          });
        })
      })
      setLoading(false)
      toast.success("Account Created Successfully")
      navigate("/login")
    
    } catch (error) {
      setLoading(false)
      toast.error("Somthing Went Wrong")
    }
  }
  return (
    <Helmet title="Singup">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5 className="text-center fw-bold">Loading...</h5>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fs-4 fw-bold">Singup</h3>
                <Form className="auth__form" onSubmit={signUpSubmit}>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      name=""
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormGroup>
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
                  <FormGroup className="form__group">
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                  </FormGroup>
                  <button type="submit" className="buy__btn auth__btn">
                    Create An Account
                  </button>
                  <p>
                    Already Have Account?<Link to="/login">Login</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
