import {scroller} from "react-scroll";

const scrollToFAQSection = () => {
    scroller.scrollTo("faq", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

export default scrollToFAQSection;