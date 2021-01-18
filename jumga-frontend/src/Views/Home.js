import { React } from "react";
import Footer from "../Components/Footer";
import "./Home.css";
import illustration from "../Images/jumboIllustrations.svg";
import Header from "../Components/Header";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home ">
      <div className="jumbo">
        <Header />
        <div className="row pb-5 pt-5">
          <div className="col-md-8 m-0 p-0">
            <img
              src={illustration}
              className="illustration"
              alt="Fast Delivery Illustration"
              width="100%"
            />
          </div>
          <div className="col-md-4 pull-left-2 m-auto p-0">
            <h1 className="jumboText text-right p-3 m-5">
              Sell your<br/> goods from the <br/>comfort of your Location
            </h1>
          </div>
        </div>
      </div>
      <div className="text-center p-5 about" id="about">
        <h3 className="shopName">About Us</h3>
        <p>
          Jumga is an online platform for sellers to make their goods and
          services instantly accessible to customers around the world with the
          click of a button.
        </p>
      </div>
      <hr className="hr" />
      <div className="p-5 faq" id="about">
        <h3 className="shopName text-center">FAQs</h3>
        <h5>What is Jumga?</h5>
        <p>
          Jumga is an online platform that helps you market your products and
          services to customers anywhere in the world.
        </p>
        <br />
        <h5>How do i start selling with Jumga?</h5>
        <p>
          All you have to do is <Link to="./CreateShop">Create a Shop</Link> by
          filling in the form with your correct details, complete a one-time
          payment of $20 and add products to your shop.
        </p>
        <p>
          You will get an email with a link to your shop where your customers
          can view your products and make purchases.
        </p>
        <br />
        <h5>How do i receive payment for my products?</h5>
        <p>
          Jumga partners with Flutterwave to integrate payment services into
          your shop. This partnership makes it very easy for you to transfer
          these funds to your local bank or better still save and transact with
          these funds directly from your flutterwave account which will be
          created for you on approval of your shop.
        </p>
        <br />
        <div className="row p-3">
          <span>
            <h5>
              Send an email to</h5> 
              <h5 className="shopName">enquires@jumga.com</h5>
              <h5>
              for more enquiries
            </h5>
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Home;
