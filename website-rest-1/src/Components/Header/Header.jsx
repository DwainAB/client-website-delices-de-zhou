import React from "react";
import "./Header.css"
import ImgHeader from "../../assets/imgheader.png"
import config from '../Config/Config.json';
import logoUber from "../../assets/uber-eats.svg"

function Header(){

    const formatText = (text) => {
        return text.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ));
      };
      
    return(
        <div className="container-header">

            <div className="container-header-info">
                <h1 className="title-header">{config.restaurantName}<br/> <span className="title-color">{config.city}</span></h1>
                <p className="text-header">{config.description}</p>
                <a className="btn-header" href="#footer">Contact</a>
                <div className="containerUber">
                  <a href="#card"><div className="containerImgUber"><span class="material-symbols-outlined">shopping_bag</span><p className="text-method text-clickcollect">CLICK & COLLECT</p></div></a>
                  <a target="blanck" href="https://www.order.store/store/rosny-wok-grill/7gJCYxkISO20eemoknDmmA"><div className="containerImgUber"><span class="material-symbols-outlined">directions_bike</span><p className="text-method">LIVRAISON</p></div></a>
                </div>
            </div>

            <div className="container-header-img">
                <img src={ImgHeader} alt="" />
            </div>

        </div>
    )
}

export default Header