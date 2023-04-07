// import { useContext } from "react";
import Page from "pages/Page";

// import Carousel from "./Carousel.jsx";
// import Upcoming from "./Upcoming.jsx";
// import About from "./About.jsx";
// import Gallery from "./Gallery.jsx";
// import Footer from "./Footer.jsx";

// navbar
// import { NavigationContext } from "contexts/NavigationContext";

const Home = () => {
    // navbar
    // const { isTabletOrMobile } = useContext(NavigationContext);

    return (
        <Page full header={"Home"} loading={false} empty={false}>
            <h1>ChargeMate D7</h1>
            <h2> DASS Project </h2>
        </Page>
    );
};

export default Home;
