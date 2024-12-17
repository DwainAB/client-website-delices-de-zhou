import React, { useState, useEffect } from "react";
import { fetchRestaurantData } from "../utils/api.jsx";
import textJson from "../TextJson/TextJson.json";
import './Cards.css';
import { Link } from "react-router-dom";

function Cards() {
    const [foods, setFoods] = useState([]);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 790);
    const itemsPerPage = isSmallScreen ? 6 : 8; // Fixe à 8 produits pour les grands écrans
    const [isLoading, setIsLoading] = useState(true);
    const nameResto = textJson.refRestaurant;

    useEffect(() => {
        const fetchFoods = async () => {
            setIsLoading(true);
            try {
                const { success, products, error } = await fetchRestaurantData(nameResto);
                if (!success) throw new Error(error);
                setFoods(products.slice(0, itemsPerPage)); // Affiche seulement les produits nécessaires
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFoods();

        const handleResize = () => {
            const smallScreen = window.innerWidth <= 790;
            setIsSmallScreen(smallScreen);
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [nameResto, itemsPerPage]);

    const addToLocalStorage = (food) => {
        let storedFoods = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingFoodIndex = storedFoods.findIndex(item => item.id === food.id);
        if (existingFoodIndex !== -1) {
            storedFoods[existingFoodIndex].quantity += 1;
        } else {
            storedFoods.push({ ...food, quantity: 1 });
        }
        localStorage.setItem('cartItems', JSON.stringify(storedFoods));
        alert(`Ajouté au panier: ${food.name}`);
    };

    return (
        <div className="container-cards" id="card">
            <h1 className="cards-title">Notre carte</h1>

            <div className="global-cards">
                {isLoading ? (
                    <div className="loading">Chargement...</div>
                ) : foods.map((food) => (
                    <div 
                        className="card" 
                        key={food.id} 
                        onClick={() => addToLocalStorage(food)}
                    >
                        {food.image ? (
                            <img className="card-img" src={`https://sasyumeats.com/${food.image}`} alt={food.name} />
                        ) : (
                            <div className="card-img-placeholder"></div>
                        )}
                        <h2 className="card-title">{food.name}</h2>
                        <div className="card-separator"></div>
                        <div className="card-info">
                            <p className="card-price">{Number(food.price).toFixed(2)} €</p>
                            <button 
                                className="card-button" 
                                type="button" 
                                onClick={(e) => { e.stopPropagation(); addToLocalStorage(food); }}
                            >
                                <div className="plus-icon"></div>
                            </button>
                        </div>
                        <p className="descriptionProduct">{food.description}</p>
                    </div>
                ))}
            </div>

            <div className="btnSeeMore">
                <Link to="/menu">Voir plus</Link>
            </div>
        </div>
    );
}

export default Cards;
