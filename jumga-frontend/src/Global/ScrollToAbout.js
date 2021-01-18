import {scroller} from "react-scroll";

const scrollToAboutSection = () => {
    scroller.scrollTo("about", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

export default scrollToAboutSection;