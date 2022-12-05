import React, { useEffect, useRef, useState } from 'react'
import "../styles/product-details.css";
import { useParams } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import Helmet from '../Helmet/Helmet'
import CommonSection from '../UI/CommonSection'

import { motion } from 'framer-motion';
import ProductsList from '../UI/ProductsList';
import { Category } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/CartSlice';
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import UserGetData from '../custom-hooks/UserGetData';
const ProductDetails = () => {
  const [product,setProduct]=useState({})
  const [tab, setTab] = useState("desc")
  const [rating, setRating] = useState(null);
  const reviewUser = useRef("")
  const reviewMsg = useRef("");
  const { id } = useParams();
  const dispatch=useDispatch()
  // const product = products.find((item => item.id === id))
  const {data:products}=UserGetData("products")
  const docRef = doc(db, "products", id)
  useEffect(() => {
    const getProduct = async () => {
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setProduct(docSnap.data())
      }
    }
    getProduct()
  }, [])
  
  const { imgUrl,
    productName,
    // avgRating,
    price,
    // reviews,
    description
    , shortDesc,
    category } = product
  const realatedProducts = products.filter((item) => item.category === category)
  const submitHandler = e => {
    e.preventDefault()
    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;
    const reviewObj = {
      userName: reviewUserName,
      userMsg: reviewUserMsg,
      rating
    };
    toast.success("Review Submited")
  }
  const addToCart = () => {
    dispatch(cartActions.addItem({
      id,
      image: imgUrl,
      productName,
      price
    }
     
    ))
     toast.success("Item Added successfully");
  }
  useEffect(() => {
    window.scrollTo(0,0)
  },[product])
  return (
    <Helmet title="Shop">
      <CommonSection title={productName} />
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt="" />
            </Col>
            <Col lg="6">
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="product__rating d-flex align-items-center gap-5 mb-4 ">
                  <div>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-half-line"></i>
                    </span>
                  </div>
                  <p>
                    {/* (<span>{avgRating}</span>Ratings) */}
                    <span>Ratings</span>
                  </p>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className="product__price">${price}</span>
                  <span>Category:{category}</span>
                </div>
                <p className="mt-3">{shortDesc}</p>
                <motion.button
                  whileTap={{ scale: 1.3 }}
                  className="buy__btn"
                  onClick={addToCart}
                >
                  Add to Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === "desc" ? "active__tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "active__tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  {/* Reviews({reviews.length}) */}
                  Reviews
                </h6>
              </div>
              {tab === "desc" ? (
                <div className="tab__content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__review mt-5">
                  <div className="review__wrapper">
                    {/* <ul>
                      {reviews?.map((item, index) => (
                        <li key={index}>
                          <h6>John Doe</h6>
                          <span>{item.rating}(rating)</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul> */}
                  </div>
                  <div className="review__form">
                    <h4>Leave your experience</h4>
                    <form onSubmit={submitHandler}>
                      <div className="form__group">
                        <input type="text" placeholder="Enter name" ref={reviewUser}required />
                      </div>
                      <div className="form__group d-flex align-items-center gap-4 rating__group">
                        <motion.span
                          whileTap={{ scale: 1.4 }}
                          onClick={() => setRating(1)}
                        >
                          1 <i class="ri-star-s-fill"></i>
                        </motion.span>
                        <motion.span
                          whileTap={{ scale: 1.4 }}
                          onClick={() => setRating(2)}
                        >
                          2 <i class="ri-star-s-fill"></i>
                        </motion.span>
                        <motion.span
                          whileTap={{ scale: 1.4 }}
                          onClick={() => setRating(3)}
                        >
                          3 <i class="ri-star-s-fill"></i>
                        </motion.span>

                        <motion.span
                          whileTap={{ scale: 1.4 }}
                          onClick={() => setRating(4)}
                        >
                          4 <i class="ri-star-s-fill"></i>
                        </motion.span>
                        <motion.span
                          whileTap={{ scale: 1.4 }}
                          onClick={() => setRating(5)}
                        >
                          5 <i class="ri-star-s-fill"></i>
                        </motion.span>
                      </div>
                      <div className="form__group">
                        <textarea
                          rows={4}
                          type="text"
                          placeholder="Review Message..."
                            ref={reviewMsg}
                            required
                        />
                      </div>
                      <motion.button
                        whileTap={{ scale: 1.4 }}
                        type="submit"
                        className="buy__btn"
                      >
                        Submit Review
                      </motion.button>
                    </form>
                  </div>
                </div>
              )}
            </Col>
            <Col lg="12" className="mt-5">
              <h2 className="related__title">You might also like</h2>
            </Col>
            <ProductsList data={realatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default ProductDetails