import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Logo from '../../assets/logo.png';
import { useNavigate, Link } from 'react-router-dom';

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1025);
    const [hasCartItems, setHasCartItems] = useState(false);
    const navigate = useNavigate();

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 1025);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const checkCartItems = () => {
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            setHasCartItems(cartItems.length > 0);
        };

        // Vérifiez immédiatement au chargement de la page
        checkCartItems();

        // Ensuite, vérifiez toutes les secondes
        const interval = setInterval(checkCartItems, 1000);

        // Nettoyez l'intervalle lorsqu'il n'est plus nécessaire
        return () => clearInterval(interval);
    }, []);

    const handleNavigate = () => {
        const restaurantAddress = "1 Rue Gustave Eiffel, 93110 Rosny-sous-Bois"; // Remplacez par l'adresse de votre restaurant
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(restaurantAddress)}`, '_blank');
    };

    const handleInformationClick = (e) => {
        e.preventDefault();
        navigate('/#hours');
    };

    return (
        <div className="container-navbar">
            {isMobile ? (
                <div className="navbar-mobile">
                    <ul className="navbar-mobile-list">
                        <Link to="/"><li className="navbar-mobile-item">
                            <span className="material-symbols-outlined">home</span>
                            <p>Accueil</p>
                        </li></Link>

                        <Link to="/menu"><li className="navbar-mobile-item">
                            <span className="material-symbols-outlined">restaurant_menu</span>
                            <p>Menu</p>
                        </li></Link>

                        <Link to="/panier"><li className="navbar-mobile-item">
                            <span className="material-symbols-outlined">shopping_basket</span>
                            <p>Panier</p>
                        </li></Link>

                        <li className="navbar-mobile-item" onClick={handleNavigate}>
                            <span className="material-symbols-outlined">location_on</span>
                            <p>Itinéraire</p>
                        </li>
                    </ul>
                </div>
            ) : (
                <>
                    <div className="container-nav-mobil">
                        {!scrolled && <img className="logo" src={Logo} alt="Logo" />}
                        <span className="material-symbols-outlined btn-menu">menu</span>
                    </div>

                    <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                        <div></div>
                        <ul className="list-links">
                            <li className="link"><Link to="/">Accueil</Link></li>
                            <li className="link"><Link to="/menu">Carte</Link></li>
                            <li className="link"><Link to="#" onClick={handleInformationClick}>Information</Link></li>
                        </ul>

                        <ul className="list-actions">
                            <li className={`action ${scrolled ? 'scrolled' : ''}`}>
                                <Link to="/panier">
                                    <span className="material-symbols-outlined">
                                        shopping_basket
                                    </span>
                                    {hasCartItems && <span className="notification-dot"></span>}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}

export default Navbar;
