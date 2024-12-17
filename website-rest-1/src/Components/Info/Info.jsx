import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';import "./Info.css"
import TextJson from "../TextJson/TextJson.json"


function Info(){
    const location = useLocation();
    const hoursRef = useRef(null);

    useEffect(() => {
        if (location.hash === '#hours' && hoursRef.current) {
            setTimeout(() => {
                hoursRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 100); // Ajustez le délai si nécessaire
        }
    }, [location]);
    
    return(
        <div className="container-info">

            <div className="container-info-hour" id="hours" ref={hoursRef}>
                <h2 className="hour-title" >Horaires :</h2>
                <div className="opening">
                    <div className="days">
                        <p className="day">Lundi</p>
                        <p className="day">Mardi </p>
                        <p className="day">Mercredi </p>
                        <p className="day">Jeudi </p>
                        <p className="day">Vendredi </p>
                        <p className="day">Samedi </p>
                        <p className="day">Dimanche </p>
                    </div>
                    <div className="Hours">
                        <p className="hour">{TextJson.mondayTime}</p>
                        <p className="hour">{TextJson.tuesdayTime}</p>
                        <p className="hour">{TextJson.wednesdayTime}</p>
                        <p className="hour">{TextJson.thursdayTime}</p>
                        <p className="hour">{TextJson.fridayTime}</p>
                        <p className="hour">{TextJson.saturdayTime}</p>
                        <p className="hour">{TextJson.sundayTime}</p>
                    </div>
                </div>
                
            </div>

            <div className="container-map">
                <iframe width="544" height="496" scrolling="no"   id="gmap_canvas" src="https://maps.google.com/maps?width=544&amp;height=496&amp;hl=en&amp;q=232%20Rue%20de%20la%20Communaut%C3%A9%20Saint-Andr%C3%A9+(D%C3%A9lices%20de%20zhou)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                <a href='http://maps-generator.com/fr'></a>
                <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=45f05604f770103a1768ffb7e98e81fc6351bd1b'></script>
            </div>

        </div>
        
    )
}

export default Info