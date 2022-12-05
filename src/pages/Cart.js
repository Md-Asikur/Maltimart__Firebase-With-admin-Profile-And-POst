import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import Helmet from '../Helmet/Helmet'
import "../styles/cart.css"
import CommonSection from '../UI/CommonSection'

import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { cartActions } from '../redux/slices/CartSlice'
import { Link } from 'react-router-dom'
const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItems)
  console.log(cartItems);
   const totalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <h2 className="fs-4 text-center">No Item Added To The Cart</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  Subtotal
                  <span className="fs-4 fw-bold">${totalAmount}</span>
                </h6>

                <p className='fs-6 mt-3'>taxes and shipping in calculate Checkout</p>
              </div>

              <div>
                <button type="" className="buy__btn w-100 ">
                  <Link to="/shop">Continue Shoping</Link>
                </button>
                <button type="" className="buy__btn w-100 mt-2">
                  <Link to="/checkout">Checkout</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}
const Tr = ({ item }) => {
  const dispatch = useDispatch()
  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id))
  }
  return (
    <tr>
      <td>
        <img src={item.imgUrl} alt="" />
      </td>
      <td>{item.productName}</td>
      <td>{item.price}</td>
      <td>{item.quantity}</td>
      <motion.td whileTap={{ scale: 1.2 }} onClick={deleteProduct}>
        <i class="ri-delete-bin-line"></i>
      </motion.td>
    </tr>
  );
}
export default Cart