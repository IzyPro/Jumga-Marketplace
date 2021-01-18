import { React } from "react";
import "./Footer.css";
import logo from "../Icons/fullLogoWhite.png";
import { ReactComponent as IG } from "../Icons/Instagram_black.svg";
import { ReactComponent as Twitter } from "../Icons/Twitter_black.svg";
import { ReactComponent as Gmail } from "../Icons/Gmail_white.svg";
import { ReactComponent as LinkedIn } from "../Icons/LinkedIN_black.svg";
import { Link } from "react-router-dom";
import scrollToAboutSection from "../Global/ScrollToAbout";
import scrollToFAQSection from "../Global/ScrollToFAQ";

function Footer() {
  return (
    <footer className="footer p-5">
      <div className="row">
        <div className="col-6 col-md">
          <img src={logo} width="100" alt="" />
          <p className="copy">&copy;2021</p>
        </div>
        <div className="row col-12 col-md justify-between">
          <div className="col-4 col-md mt-3">
            <h5 className="list-hd text-left">Company</h5>
            <Link className="Link" to="./" onClick={scrollToAboutSection}>
              <h6 className="text-left">About</h6>
            </Link>
            <Link className="Link" to="./" onClick={scrollToFAQSection}>
              <h6 className="text-left">FAQs</h6>
            </Link>
          </div>
          <div className="col-4 col-md mt-3">
            <h5 className="list-hd text-left">Services</h5>
            <Link className="Link" to="./CreateShop">
              <h6 className="text-left">Register as a Seller</h6>
            </Link>
            <p> </p>
          </div>
          <div className="col-6 col-md mt-3">
            <h5 className="list-hd text-left">Contact</h5>
            <Gmail className="float-left m-1" width="20" />
            <Twitter className="float-left m-1" width="20" />
            <IG className="float-left m-1" width="20" />
            <LinkedIn className="float-left m-1" width="20" />
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
