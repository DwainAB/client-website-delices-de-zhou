import React from "react";
import './Features.css'
import symbol1 from '../../assets/symbol1-features.svg'
import symbol2 from '../../assets/symbol2-features.svg'
import symbol3 from '../../assets/symbol3-features.svg'
import textJson from "../TextJson/TextJson.json";

function Features(){

     const formatText = (text) => {
        return text.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ));
      };

    return(
        <div className="container-features">
             <h1 className="features-title">Nos caractéristiques</h1>
             <div className="features-cards-global">

                <div className="features-card">
                    <img className="features-card-img" src={symbol1} alt="" />
                    <h2 className="features-card-title">{textJson.titleCharacteristic1}</h2>
                    <p className="features-card-p">{formatText(textJson.DescriptionCharacteristic1)}</p>
                </div>

                <div className="features-card">
                    <img className="features-card-img" src={symbol2} alt="" />
                    <h2 className="features-card-title">{textJson.titleCharacteristic2}</h2>
                    <p className="features-card-p">{formatText(textJson.DescriptionCharacteristic2)}</p>
                </div>

                <div className="features-card">
                    <img className="features-card-img" src={symbol3} alt="" />
                    <h2 className="features-card-title">{textJson.titleCharacteristic3}</h2>
                    <p className="features-card-p">{formatText(textJson.DescriptionCharacteristic3)}</p>
                </div>

                

             </div>
        </div>
    )
}

export default Features;