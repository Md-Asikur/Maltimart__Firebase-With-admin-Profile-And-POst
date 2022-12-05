import React from "react";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import Facebook from "@mui/icons-material/Facebook";
import YouTube from "@mui/icons-material/YouTube";
import Instagram from "@mui/icons-material/Instagram";
import "./footer.css";
import { NavLink } from "react-router-dom";
export default function Footer() {
  return (
    <>
      
      <footer class="footer">
        <div class="container">
          <div class="row">
            <div class="footer-col">
              <h4>company</h4>
              <ul>
                <li>
                  <a href="#">about us</a>
                </li>
                <li>
                  <a href="#">our services</a>
                </li>
                <li>
                  <a href="#">privacy policy</a>
                </li>
                <li>
                  <a href="#">affiliate program</a>
                </li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>get help</h4>
              <ul>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">shipping</a>
                </li>
                <li>
                  <a href="#">returns</a>
                </li>
                <li>
                  <a href="#">order status</a>
                </li>
                <li>
                  <a href="#">payment options</a>
                </li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>online shop</h4>
              <ul>
                <li>
                  <a href="#">watch</a>
                </li>
                <li>
                  <a href="#">bag</a>
                </li>
                <li>
                  <a href="#">shoes</a>
                </li>
                <li>
                  <a href="#">dress</a>
                </li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>follow me</h4>
              <div class="social-links">
                <a href="#">
                  <Facebook />
                </a>
                <a href="#">
                  <YouTube />
                </a>
                <a href="#">
                  <Instagram />
                </a>
                <a href="#">
                  <MarkEmailUnreadOutlinedIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center" id="copy-text">
          © 2022 Md Asikur,Bangladesh. All Rights Reserved.
          <NavLink to="/support">Terms</NavLink> |
          <NavLink to="/support"> Privacy Policy.</NavLink>
        </p>
      </footer>
    </>
  );
}
