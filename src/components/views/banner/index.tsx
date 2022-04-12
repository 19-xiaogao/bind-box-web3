import React from 'react'
import { Carousel } from 'antd'


function BannerJsx() {
    function onChange(currentSlide: number) {
        console.log("banner changed ", currentSlide);

    }
    const contentStyle: React.CSSProperties = {
        height: '500px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    return <Carousel afterChange={onChange} autoplay>
        <div>
            <h3 style={contentStyle}>1</h3>
        </div>
        <div>
            <h3 style={contentStyle}>2</h3>
        </div>
        <div>
            <h3 style={contentStyle}>3</h3>
        </div>
        <div>
            <h3 style={contentStyle}>4</h3>
        </div>
    </Carousel>
}

export default BannerJsx

