import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';import "./Info.css"
import config from '../Config/Config.json';

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
                        <p className="hour">{config.mondayTime}</p>
                        <p className="hour">{config.tuesdayTime}</p>
                        <p className="hour">{config.wednesdayTime}</p>
                        <p className="hour">{config.thursdayTime}</p>
                        <p className="hour">{config.fridayTime}</p>
                        <p className="hour">{config.saturdayTime}</p>
                        <p className="hour">{config.sundayTime}</p>
                    </div>
                </div>
                
            </div>

            <div className="container-map">
            <iframe
            width="544"
            height="496"
            id="gmap_canvas"
            src="https://maps.google.com/maps?width=544&amp;height=496&amp;hl=en&amp;q=1%20Rue%20Gustave%20Eiffel%20Rosny-sous-bois+(Wok%20Grill%20Rosny-sous-bois)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            title="Map"
            ></iframe>
            <a href="https://maps-generator.com/"> </a>
            </div>

        </div>
        
    )
}

export default Info