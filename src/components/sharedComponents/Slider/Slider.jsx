import { useEffect, useState } from "react";
import { sliderData } from "./Slider_data/sliderData";

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(1);
    const handlePrevSLide = () => {
        const previousSlide = (currentSlide == 1 ? sliderData.length : currentSlide - 1)
        setCurrentSlide(previousSlide);
    }

    const handleNextSlide = () => {
        const nextSlide = (currentSlide == sliderData.length ? 1 : currentSlide + 1);
        setCurrentSlide(nextSlide);
    }
    useEffect(() => {
        const intervalId = setInterval(() => {
            currentSlide == sliderData.length ? setCurrentSlide(1) : setCurrentSlide(currentSlide + 1)
        }, 5000);
        return () => {
            clearInterval(intervalId);
        };
    }, [currentSlide])
    return (
        <div>
            <div className="carousel w-full min-h-screen overflow-none">
                {sliderData.map((sliderItem, index) => <div key={index} id={index + 1} className={`carousel-item absolute inset-0 w-full duration-1000 ${index + 1 == currentSlide ? 'opacity-100' : 'opacity-0'}`}

                >
                    <img src={sliderItem.image} className="w-full h-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-0 right-0  top-1/2">
                        <button className="btn btn-circle " onClick={handlePrevSLide}>❮</button>
                        <button className="btn btn-circle" onClick={handleNextSlide} >❯</button>
                    </div >
                    <div className={`text-center grid gap-2 md:gap-5 lg:gap-10 bg-black bg-opacity-40 p-5 text-white rounded w-fit md:w-1/2 lg:w-1/3 z-10 absolute duration-1000 ${index + 1 == currentSlide ? ' bottom-20 left-10 md:bottom-32 md:left-36 lg:bottom-44 lg:left-[35%] ' : ' left-10 -bottom-10 md:left-36 lg:left-[35%]'}`}>
                        <h2 className="text-lg md:text-3xl lg:text-5xl font-bold">{sliderItem.heading}</h2>
                        <p className="text-sm md:text-lg">{sliderItem.desc}</p>
                        <a href="#home" className="btn btn-sm md:btn-md w-1/2 mx-auto lg:btn-lg btn-warning">Shop Now</a>
                    </div>
                </div>)}

            </div>
        </div>
    );
};

export default Slider;