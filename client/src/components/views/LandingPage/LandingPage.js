import React from 'react'
import {RocketFilled} from "@ant-design/icons";

function LandingPage() {

    return (
        <div stype={{width: '75%', margin: '3rem auto'}}>
            <div style={{textAlign: 'center'}}>
                <h2> 유기동물 봉사-입양 플랫폼 랜딩페이지 </h2>
                <RocketFilled  />
                <RocketFilled  />
                <RocketFilled  />
            </div>
            <div style={{maxWidth: '700px', margin: '2rem auto'}}>
                <img style={{ width:'100%', height:'80%', alignContent :"center"}}
                     src={`http://localhost:5000/uploads/temp/temp_landing1.jpg`}/>
            </div>
        </div>
    )

}

export default LandingPage
