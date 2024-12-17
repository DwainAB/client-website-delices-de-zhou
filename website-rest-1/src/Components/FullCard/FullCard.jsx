import React, { useState, useEffect, useRef } from "react";
import { apiService } from "../../API/apiService";
import textJson from "../TextJson/TextJson.json";
import './FullCard.css'; // Assurez-vous d'importer le fichier CSS
import {fetchRestaurantData} from "../utils/api.jsx"

function FullCardComponent() {
    const [foods, setFoods] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isSticky, setIsSticky] = useState(false);
    const [activeCategory, setActiveCategory] = useState('');
    const nameResto = textJson.refRestaurant;
    const categoryRefs = useRef({});
    const categoriesRef = useRef(null);

    useEffect(() => {
        const fetchFoodsAndCategories = async () => {
            try {
                // Appel de l'Edge Function
                const { success, products, categories, error } = await fetchRestaurantData(nameResto);
        
                if (!success) throw new Error(error);
        
                // Met à jour les états avec les données récupérées
                setCategories(categories);
                setFoods(products);
                console.log(products, categories);
                
              } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
              }
            };
        
            fetchFoodsAndCategories();

        const handleScroll = () => {
            const offset = window.scrollY;
            setIsSticky(categoriesRef.current.getBoundingClientRect().top <= 70); // 70 correspond à la hauteur de la barre de navigation
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [nameResto]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveCategory(entry.target.id);
                    scrollToActiveCategory(entry.target.id);
                }
            });
        }, { threshold: 0, rootMargin: '0px 0px -90% 0px' });

        if (categoryRefs.current) {
            Object.values(categoryRefs.current).forEach(section => {
                if (section) observer.observe(section);
            });
        }

        return () => {
            if (categoryRefs.current) {
                Object.values(categoryRefs.current).forEach(section => {
                    if (section) observer.unobserve(section);
                });
            }
        };
    }, [categories]);

    const scrollToActiveCategory = (activeId) => {
        const activeElement = document.querySelector(`a[href="#${activeId}"]`);
        if (activeElement && categoriesRef.current) {
            const elementOffset = activeElement.offsetLeft - (categoriesRef.current.clientWidth / 2) + (activeElement.clientWidth / 2);
            categoriesRef.current.scrollTo({
                left: elementOffset,
                behavior: 'smooth'
            });
        }
    };

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
        <div className="fullCardComponent">
            <h1 className="title-fullCard">Menu</h1>
            <div ref={categoriesRef} className={`categories ${isSticky ? 'sticky' : ''}`}>
                {categories.map((category) => (
                    <div className="test" key={category.id}>
                        <a 
                            href={`#${category.name}`} 
                            className={`${isSticky ? 'sticky-link' : ''} ${activeCategory === category.name ? 'active-link' : ''}`}
                        >
                            {category.name}
                        </a>
                    </div>
                ))}
            </div>
            <div className="foods">
                {categories.map((category) => (
                    <div 
                        key={category.id} 
                        id={category.name} 
                        className="category-section" 
                        ref={el => categoryRefs.current[category.name] = el}
                    >
                        <div className="category-header">
                            <h2>{category.name}</h2>
                        </div>
                        <div className="cards-container">
                            {foods.filter(food => food.category_id === category.id).map((food) => (
                                <div 
                                    className="card" 
                                    key={food.id} 
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
                                        <button className="card-button" type="button" onClick={(e) => {e.stopPropagation(); addToLocalStorage(food);}}>
                                            <div className="plus-icon"></div>
                                        </button>
                                    </div>
                                    <p className="descriptionProduct">{food.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FullCardComponent;
