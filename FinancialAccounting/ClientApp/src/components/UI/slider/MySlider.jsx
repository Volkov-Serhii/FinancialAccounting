import React from 'react';
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {withTranslation} from "react-i18next";

const MySlider = (props) => {

    return (
        <CarouselProvider
            style={{textAlign: "center", justifyContent: "center"}}
            naturalSlideWidth={320}
            naturalSlideHeight={200}
            totalSlides={props.array.length}
        >
            <Slider style={{textAlign: "center", border: "1px solid teal", backgroundColor: "hsla(180,100%,25%, 0.5)"}}>
                {props.array.map((item, index) => (
                    <Slide style={{display: "table-cell", verticalAlign: "middle"}} index={index} key={index}>
                        <div>
                            {item.accountName}
                        </div>
                        <div>
                            {item.balance}
                        </div>
                    </Slide>
                ))}
            </Slider>

            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
        </CarouselProvider>

    );
}

export default withTranslation()(MySlider);