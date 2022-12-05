import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import UserGetData from '../custom-hooks/UserGetData'
import "../styles/dashboard.css"
const Dashboard = () => {
  const {data:products } = UserGetData('users')
   const {data:users} = UserGetData("products");
  return (
    <section>
      <Container>
        <Row>
          <Col className="lg-3">
            <div className="revenue__box">
              <h5>Total Sales</h5>
              <span>$96353</span>
            </div>
          </Col>
         
          <Col className="lg-3">
            <div className="orders__box">
              <h5>Total Orders</h5>
              <span>96</span>
            </div>
          </Col>
          <Col className="lg-3">
            <div className="products__box">
              <h5>Total Products</h5>
              <span>{ products.length}</span>
            </div>
          </Col>
          <Col className="lg-3">
            <div className="users__box">
              <h5>Total Users</h5>
              <span>{users.length}</span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Dashboard