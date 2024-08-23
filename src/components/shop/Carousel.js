import React, { useState } from "react";

const Carousel = () => {
    const imageArr = [{ url: 'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/02569b9828c7ec85.jpg?q=20' }, { url: 'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/909a32737b6d03e0.jpg?q=20' }, { url: 'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/fba99b97b0581fb3.jpeg?q=20' }, { url: 'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/fd835e5163084483.jpg?q=20' }]
    const [carouselImgs, setCarouselImgs] = useState(imageArr)
    const [currentSlide, setCurrentSlide] = useState(0)

    let i = 0
    // setInterval(() => {
    //     console.log('==> slide', currentSlide)
    //     console.log('==> carouselImgs.length', carouselImgs.length)
    //     if (currentSlide >= carouselImgs.length - 1) {
    //         setCurrentSlide(0)
    //         i = 0
    //     } else {
    //         setCurrentSlide(currentSlide + 1)
    //     }
    //     // if (i > carouselImgs.length) {
    //     //     i = 0
    //     // }
    // }, 3000);

    const previousClick = (e) => {
        e.preventDefault()
        setCurrentSlide((slide) => {
            if (slide === 0) {
                slide = carouselImgs.length - 1
                return slide
            } else {
                return slide -= 1
            }
        })
    }

    const nextClick = (e) => {
        e.preventDefault()
        // setCurrentSlide((slide) => slide += 1)
        setCurrentSlide((slide) => slide === carouselImgs.length - 1 ? 0 : slide += 1)
    }

    const generateButtons = (e) => {
        return (
            <div className="slide-round-button-container">
                {carouselImgs.map((img, e) => <button onClick={() => setCurrentSlide(e)} className={e === currentSlide ? "slide-round-button active" : "slide-round-button"} key={e}></button>)}
            </div>
        )
    }

    return (
        <div className="carousel-container">
            Carousel
            <div className="image-container">
                {carouselImgs.map((img, e) => (
                    <div className={currentSlide === e ? 'show image' : 'hide image'} key={e}>
                        {/* {img} */}
                        <img height={'100%'} width={'100%'} src={img.url} />
                    </div>
                ))}
            </div>
            <div className="image-btns">
                <button onClick={previousClick} className="previous">&lt;</button>
                <button onClick={nextClick} className="next">&gt;</button>
            </div>
            {generateButtons()}
        </div>
    )
}

export default Carousel