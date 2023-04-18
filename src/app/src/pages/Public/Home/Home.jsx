// import { useContext } from "react";
import Page from "pages/Page";
import home from "./home.jpeg";

// navbar
// import { NavigationContext } from "contexts/NavigationContext";

const Home = () => {
    // navbar
    // const { isTabletOrMobile } = useContext(NavigationContext);

    return (
        <Page full header={"ChargeMate D7"} loading={false} empty={false}>
            <img src={home} />
            <h3>Welcome to the world, where hassle free charging is on your fingertips</h3>
        </Page>
    );
};

export default Home;
