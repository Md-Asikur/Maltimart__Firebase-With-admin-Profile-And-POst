import React from 'react'
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import Helmet from '../Helmet/Helmet'
import CommonSection from '../UI/CommonSection'
import "../styles/checkout.css";
import { useSelector } from 'react-redux';
const Cheackout = () => {
  const totalQty = useSelector(state => state.cart.totalQuantity)
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <Helmet title="Check Out">
      <CommonSection title="Check Out" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              <Form className="billing__form">
                <FormGroup className="form__group">
                  <input type="text" name="" value="" placeholder="Enter Name" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="email" name="" value="" placeholder="Enter Email" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="number" name="" value="" placeholder="Phone Number" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" name="" value="" placeholder="Street Address" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" name="" value="" placeholder="City" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" name="" value="" placeholder="Postal code" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" name="" value="" placeholder="Country" />
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className="checkout__cart">
                <h6>
                  Total Qty:<span>{totalQty} items</span>
                </h6>
                <h6>
                  Subtotal:<span>${totalAmount}</span>
                </h6>
                <h6>
                  <span>
                    {" "}
                    Shipping:
                    <br />
                    Free Shipping
                  </span>
                  <span>0</span>
                </h6>

                <h4>
                  Total Cost:<span>${totalAmount}</span>
                </h4>
                <button type="" className="buy__btn auth__btn w-100">
                  Place An Order
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default Cheackout