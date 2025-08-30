import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import CallUs from "../CallUs/CallUs";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import OurSlogan from "../OurSlogan/OurSlogan";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Bistro | Home</title>
      </Helmet>
      <Banner></Banner>
      <Category></Category>
      <OurSlogan></OurSlogan>
      <PopularMenu></PopularMenu>
      <CallUs></CallUs>
      <Featured></Featured>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
