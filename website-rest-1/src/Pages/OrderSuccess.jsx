import React from "react";
import textJson from "../Components/TextJson/TextJson.json"
import logo from "../assets/logo.png"

function OrderSuccess(){

    const email = localStorage.getItem('userEmail')

    return(
        <>
            <h1 style={{marginTop: "150px"}}>Merci pour votre commande !</h1>
            <p>Nous avons bien reçu votre commande, un email de confirmation vous à été envoyé à <span style={{color: "var(--secondary-color)"}}>{email}</span>. <br /><br />
               Vous y trouverez votre numéro de commande à transmettre lors de la récupéation de votre commande. <br />
               
            </p>
            {textJson.phone && <p>Si vous rencontrez un problème ou avez besoin d'informations suplémentaires, merci de nous contacter au : <span style={{color: "var(--secondary-color)"}}>{textJson.phone}</span></p>}

            <p style={{marginBottom: window.innerWidth < 768 ? "50px" : "100px"}} >L'équipe <span style={{fontWeight:"bold"}}>{textJson.restaurantName}</span> vous remercie ! </p>

            <img style={{width:"200px", display:"block", margin:"0 auto", marginBottom: window.innerWidth < 768 ? "75px" : "150px"}} src={logo} alt="" />
        </>
    )
}

export default OrderSuccess