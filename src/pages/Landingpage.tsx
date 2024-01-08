import ProductHowItWorks from "../components/HowItWorks";

import Intro from "../components/Intro";
import NavBar from "../components/Navbar";
import ProductCategories from "../components/ProductCategories";
import ProductValues from "../components/ProductValues";

const LandingPage = () => {
  return (
    <>
      <div>
        <NavBar />
        <Intro/>
        <ProductValues/>
        <ProductHowItWorks/>
        <ProductCategories/>
      </div>
    </>
  );
};

export default LandingPage;
