import React, { useState, useEffect } from "react";
import { apiService } from '../../API/apiService';
import './Cards.css';
import config from '../Config/Config.json';
import { Link } from "react-router-dom";

function Cards() {
    const [foods, setFoods] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Tous');
    const [categories, setCategories] = useState([]); // État pour les catégories
    const [currentPage, setCurrentPage] = useState(1);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 790);
    const [itemsPerPage, setItemsPerPage] = useState(isSmallScreen ? 6 : 10);
    const [isLoading, setIsLoading] = useState(true); // État pour le suivi du chargement
    const [selectedFood, setSelectedFood] = useState(null); // État pour le plat sélectionné
    const [hoveredFood, setHoveredFood] = useState(null); // État pour le plat survolé
    const nameResto = config.ref_restaurant

    useEffect(() => {
        const fetchFoodsAndCategories = async () => {
            setIsLoading(true)
            try {
                const fetchedFoods = await apiService.getFoods(nameResto);
                const fetchedCategories = await apiService.getAllCategories(nameResto);
                setFoods(fetchedFoods);
                setCategories(fetchedCategories);
                console.log(categories);
                setIsLoading(false) 
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
                setIsLoading(false)
            }
        };

        fetchFoodsAndCategories();
        
        const handleResize = () => {
            const smallScreen = window.innerWidth <= 790;
            setIsSmallScreen(smallScreen);
            setItemsPerPage(smallScreen ? 6  : 10);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const addToLocalStorage = (food) => {
        let storedFoods = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingFoodIndex = storedFoods.findIndex(item => item.id === food.id);
        if (existingFoodIndex !== -1) {
            storedFoods[existingFoodIndex].quantity += 1;
        } else {
            storedFoods.push({ ...food, quantity: 1 });
        }
        localStorage.setItem('cartItems', JSON.stringify(storedFoods));
        alert(`Ajouté au panier: ${food.title}`);
        window.location.reload();
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const filteredFoods = Array.isArray(foods) ? foods.filter((food) => {
        return selectedCategory === 'Tous' || food.category === selectedCategory;
    }) : [];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFoods = filteredFoods.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageCount = Math.ceil(filteredFoods.length / itemsPerPage);

    const handleCardClick = (food) => {
        setSelectedFood(food);
    };

    const closeModal = () => {
        setSelectedFood(null);
    };

    const handleNextPage = () => {
        if (currentPage < pageCount) {
            paginate(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    };

    const handleFirstPage = () => {
        paginate(1);
    };

    const handleLastPage = () => {
        paginate(pageCount);
    };

    return (
        <div className="container-cards" id="card">
            <h1 className="cards-title">Notre carte</h1>

            <div className="global-cards">
                {isLoading ? (
                    <div className="loading">Chargement...</div>
                ) : currentFoods.map((food) => (
                    <div 
                        className="card" 
                        key={food.id} 
                        onClick={() => handleCardClick(food)} 
                        onMouseEnter={() => setHoveredFood(food)} 
                        onMouseLeave={() => setHoveredFood(null)}
                    >
                        {food.image ? (
                            <img className="card-img" src={`https://sasyumeats.com/${food.image}`} alt={food.title} />
                        ) : (
                            <div className="card-img-placeholder"></div>
                        )}
                        <h2 className="card-title">{food.title}</h2>
                        <div className="card-separator"></div>
                        <div className="card-info">
                            <p className="card-price">{food.price} €</p>
                            <button className="card-button" type="button" onClick={(e) => {e.stopPropagation(); addToLocalStorage(food);}}>
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
