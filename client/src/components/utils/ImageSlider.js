import React from 'react'
import {Carousel} from 'antd';
import arrows from '@ant-design/react-slick';

function ImageSlider(props) {

    return (
        <div>
            <Carousel
                autoplay
                leftArrowText={'＜'}
                leftArrowStyle={{color: 'white', fontSize: 22, margin: 20}}
                rightArrowText={'＞'}
                rightArrowStyle={{color: 'white', fontSize: 22, margin: 20}}
                arrows
            >
                {props.images.map((image, index) => (
                    <div key={index}>
                        <img style={{ width:'100%', maxHeight: '150px'}}
                             src={`http://localhost:5000/${image}`}/>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider