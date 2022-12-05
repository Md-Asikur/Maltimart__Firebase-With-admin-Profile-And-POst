import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../Helmet/Helmet";
import heroImg from "../assets/images/hero-img.png"
import "../styles/home.css"
import { Link } from "react-router-dom";
import {motion} from "framer-motion"
import Services from "../services/Services";
import ProductsList from "../UI/ProductsList";
import products from "../assets/data/products"
import counterImg from "../assets/images/counter-timer-img.png"
import Clock from "../UI/Clock";
import UserGetData from "../custom-hooks/UserGetData";
const Home = () => {
 const{data:products,loading}=UserGetData("products")
  const [trendingProucts, setTrendingProducts] = useState([])
  const [bestSalesProucts, setBestSalesProucts] = useState([]);
  const [mobileProucts, setMobileProducts] = useState([]);
  const [wirelessProucts, setWirelessProducts] = useState([]);
   const [popularProucts, setPopularProducts] = useState([]);
  const year = new Date().getFullYear();
  useEffect(() => {
    const filterdTrendingProducts = products.filter((item) => item.category === "chair")
    const filterdBestSalesProducts = products.filter((item) => item.category === "sofa");
      const filterdMobileProducts = products.filter(
        (item) => item.category === "mobile"
    );
    const filterdWirelessProducts = products.filter((item) => item.category === "wireless");
     const filterdPopularProducts = products.filter(
       (item) => item.category === "watch"
     );
    setTrendingProducts(filterdTrendingProducts)
    setBestSalesProucts(filterdBestSalesProducts)
    setMobileProducts(filterdMobileProducts)
    setWirelessProducts(filterdWirelessProducts)
    setPopularProducts(filterdPopularProducts)
  },[products]
  )
  
  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">Trending Products in {year}</p>
                <h2>Make Your Interior More Minimalistic & Modern</h2>
                <p>
                  Esse aute excepteur voluptate ipsum nostrud aliquip ex amet. Mollit
                  cupidatat ullamco quis cillum ea velit eiusmod esse. Laboris dolor anim
                </p>
                <motion.button whileTap={{ scale: 1.3 }} className="buy__btn">
                  <Link to="shop">Shop Now</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services />
      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h3 className="section__title">Trending Products</h3>
            </Col>
            <ProductsList data={trendingProucts} />
          </Row>
        </Container>
      </section>
      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h3 className="section__title">Best Sales</h3>
            </Col>
            <ProductsList data={bestSalesProucts} />
          </Row>
        </Container>
      </section>
      <section className="timer__count">
        <Container>
          <Row>
            <Col lg="6" md="12" className="count__down-col">
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
              </div>
              <Clock />
              <motion.button whileTap={{ scale: 1.2 }} className="buy__btn store__btn">
                <Link to="shop">Visit Store</Link>
              </motion.button>
            </Col>

            <Col lg="6" md="12" className="text-end counter__img">
              <img src={counterImg} alt="" />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h3 className="section__title">New Arrivals</h3>
            </Col>
            <ProductsList data={mobileProucts} />
            <ProductsList data={wirelessProucts} />
          </Row>
        </Container>
      </section>
      <section className="popular__category">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h3 className="section__title">Popular In Category</h3>
            </Col>
            <ProductsList data={popularProucts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
