
import Slider from "../../sharedComponents/Slider/Slider";
import HomeContent from "./HomeContent/HomeContent";

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <div id="home">
                <HomeContent></HomeContent>
            </div>
        </div>
    );
};

export default Home;