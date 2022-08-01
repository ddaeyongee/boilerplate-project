import React from 'react'
import {RocketFilled} from "@ant-design/icons";

function DonationPage() {

    return (
        <div style={{width: '90%', margin: '3rem auto'}}>
            <div style={{textAlign: 'center'}}>
                <h2> DonationPage </h2>
                <RocketFilled/>
                <RocketFilled/>
                <RocketFilled/>
            </div>
            <div style={{maxWidth: '1000px', margin: '2rem auto'}}>
                <img style={{width: '100%', height: '80%', alignContent: "center"}}
                     src={`http://localhost:5000/uploads/temp/img_ready.png`}/>
            </div>
        </div>
    )
}

export default DonationPage
