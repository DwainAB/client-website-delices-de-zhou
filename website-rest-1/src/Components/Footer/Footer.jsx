import React from "react";
import "./Footer.css";
import BackFooter from "../../assets/footer.png";
import Phone from "../../assets/phone.svg";
import Email from "../../assets/email.svg";
import LocationImg from "../../assets/location.svg";
import textJson from "../TextJson/TextJson.json";
import { Camera } from "lucide-react"; // Icône de Lucide

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
                    <li><p className="info-footer-text">{formatText(textJson.address)}</p></li>
                </ul>
                <ul className="email">
                    <li className="li-title"><img className="info-footer-img" src={Email} alt="" /><h3 className="info-footer-title">Email</h3></li>
                    <li className="linkFooter">
                        <a href={`mailto:${textJson.email}`} className="info-footer-text">{textJson.email}</a>
                    </li>
                </ul>

                
            </div>

            <ul className="number">
                <li className="linkFooter">
                    <a target="blanck" href={`${textJson.socialFB}`} className="info-footer-text">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"  className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                </li>
            </ul>

            <p className="credit">Réalisé par Yumco</p>
        </div>
    );
}

export default Footer;
