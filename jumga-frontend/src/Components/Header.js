import React, { useState } from "react";
import "./Header.css";
import logoIcon from "../logo.svg";
import logo from "../Icons/fullLogo.png";
import { Link } from "react-router-dom";
import { ReactComponent as CloseMenu } from "../Icons/clear.svg";
import { ReactComponent as MenuIcon } from "../Icons/subject.svg";
import scrollToAboutSection from "../Global/ScrollToAbout";
import scrollToFAQSection from "../Global/ScrollToFAQ";

function Header() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  return (
    <div>
        <div className="row spn mr-3">
        <span className="shopName">
              <img src={logoIcon} alt="clear icon" width="10" className="m-0 mb-1 mr-1 p-0" />
              Instant online platform to market your products
            </span>
        </div>
      <hr />

      <div className="header pt-2">
        <div className="col text-right">
          <div className="col text-left m-0 p-0">
            <Link className="Logo my-0 mr-md-auto" to="/">
              <img src={logo} width="100" className="mt-2" alt="Jumga Logo" />
            </Link>
          </div>
          <ul className={click ? "nav-options active" : "nav-options"}>
            <li className="option mobile-option" onClick={closeMobileMenu}>
              <Link className="m-3" to="./" onClick={scrollToAboutSection}>
                About
              </Link>
            </li>
            <li className="option mobile-option" onClick={closeMobileMenu}>
              <Link className="m-3" to="./" onClick={scrollToFAQSection}>
                FAQs
              </Link>
            </li>
            <li className="option mobile-option" onClick={closeMobileMenu}>
              <Link className="m-3" to="./Login">
                Login
              </Link>
            </li>
            <li className="option mobile-option" onClick={closeMobileMenu}>
              <Link className="m-3" to="./CreateShop">
                <button className="btn-lg pb-3 shadow-lg">Create Shop</button>
              </Link>
            </li>
          </ul>
        </div>
        <ul className="signin-up">
          <li className="sign-in" onClick={closeMobileMenu}>
            <Link className="m-3" to="./" onClick={scrollToAboutSection}>
              About
            </Link>
          </li>
          <li className="sign-in" onClick={closeMobileMenu}>
            <Link className="m-3" to="./" onClick={scrollToFAQSection}>
              FAQs
            </Link>
          </li>
          <li className="sign-in" onClick={closeMobileMenu}>
            <Link className="m-3" to="./Login">
              Login
            </Link>
          </li>
          <li onClick={closeMobileMenu}>
            <Link className="m-3" to="./CreateShop">
              <button className="btn-lg pb-3 shadow-lg">Create Shop</button>
            </Link>
          </li>
        </ul>
        <div className="mobile-menu" onClick={handleClick}>
          {click ? (
            <CloseMenu className="menu-icon" />
          ) : (
            <MenuIcon className="menu-icon" />
          )}
        </div>
      </div>
    </div>
  );
}
export default Header;
