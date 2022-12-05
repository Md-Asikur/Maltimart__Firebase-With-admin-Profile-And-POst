import { deleteDoc,doc } from 'firebase/firestore';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Col, Container, Row } from 'reactstrap'
import UserGetData from '../custom-hooks/UserGetData';
import { db } from '../firebase.config';

const Users = () => {
  
    const { data: userData, loading } = UserGetData('users')
     const deleteUser = async (id) => {
       await deleteDoc(doc(db, "users", id));
       toast.success("User Deleted Successfully!");
     };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="fw-bold">Users</h4>
          </Col>
          <Col lg="12" className="pt-5">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>UserName</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <h5 className="pt-5 fw-bold">Loading...</h5>
                ) : (
                  userData?.map((user) => (
                    <tr key={user.uid}>
                      <td>
                        <img src={user.photoURL} alt="" />
                      </td>
                      <td>{user.displayName}</td>
                     
                      <td>{user.email}</td>
                      <td><button onClick={()=>deleteUser(user.uid)} className='btn btn-danger'>Delete</button></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Users