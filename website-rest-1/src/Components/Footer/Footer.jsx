import React from "react";
import "./Footer.css";
import BackFooter from "../../assets/footer.png";
import Phone from "../../assets/phone.svg";
import Email from "../../assets/email.svg";
import LocationImg from "../../assets/location.svg";
import config from '../Config/Config.json';

function Footer(){

    const formatText = (text) => {
        return text.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ));
      };

    return(
        <div id="footer" className="container-footer">
            <img className="background-footer" src={BackFooter} alt="" />

            <div className="container-info-footer">
                <ul className="location">
                    <li className="li-title"><img className="info-footer-img" src={LocationImg} alt="" /><h3 className="info-footer-title">Localisation</h3></li>
                    <li><p className="info-footer-text">{formatText(config.address)}</p></li>
                </ul>
                <ul className="number">
                    <li className="li-title"><img className="info-footer-img" src={Phone} alt="" /><h3 className="info-footer-title">Téléphone</h3></li>
                    <li className="linkFooter">
                        <a href={`tel:${config.phone}`} className="info-footer-text">{config.phone}</a>
                    </li>
                </ul>
                <ul className="email">
                    <li className="li-title"><img className="info-footer-img" src={Email} alt="" /><h3 className="info-footer-title">Email</h3></li>
                    <li className="linkFooter">
                        <a href={`mailto:${config.email}`} className="info-footer-text">{config.email}</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;
