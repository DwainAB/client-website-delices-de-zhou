import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./BasketComponent.css";
import textJson from "../TextJson/TextJson.json";

function BasketComponent() {
    const [totalPrice, setTotalPrice] = useState(0);
    const [deliveryModes, setDeliveryModes] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [commentProductId, setCommentProductId] = useState(null); 
    const [tempComment, setTempComment] = useState(""); 
    const nameRestaurant = textJson.refRestaurant;
    const navigate = useNavigate();
    const openingHours = textJson.openingHours;

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            street: "",
            country: "",
            postal_code: "",
            city: "",
            method: "PICKUP",
            payment: "",
            comment: "",
            ref_restaurant: nameRestaurant
        }
    });

    useEffect(() => {
        //console.log("textJson:", textJson);
        const options = [];
        if (textJson?.deliveryOptions?.delivery) {
            options.push({ value: "DELIVERY", label: "Livraison" });
        }
        if (textJson?.deliveryOptions?.pickup) {
            options.push({ value: "PICKUP", label: "À emporter" });
        }
        setDeliveryModes(options);
    }, [textJson]);

    useEffect(() => {
        if (deliveryModes.length === 1) {
            setValue("method", deliveryModes[0].value); 
        } else {
            setValue("method", ""); 
        }
    }, [deliveryModes, setValue]);
    
    
    
    const checkIfOpen = () => {
        const now = new Date();
        const currentDay = now.getDay();
        const currentHour = now.getHours() + now.getMinutes() / 60;

        const isOpenNow = openingHours.some(
            ({ day, start, end }) => day === currentDay && currentHour >= start && currentHour < end
        );

        setIsOpen(isOpenNow);
    };

    useEffect(() => {
        checkIfOpen();
        const interval = setInterval(checkIfOpen, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);

    useEffect(() => {
        const newTotalPrice = cartItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
        setTotalPrice(newTotalPrice);
    }, [cartItems]);

    const onSubmit = async (data) => {
        try {
            const addressData = (data.street || data.city || data.postal_code || data.country) ? {
                street: data.street,
                city: data.city,
                postal_code: data.postal_code,
                country: data.country,
                category: "ORDERS",
            } : null;

            const orderPayload = {
                order: {
                    amount_total: totalPrice,
                    amount_subtotal: totalPrice,
                    amount_tax: totalPrice,
                    status: "PENDING",
                    comment: data.comment,
                    payment_status: "unpaid",
                    requested_time: new Date().toISOString(),
                    completed_at: null,
                    restaurant_id: nameRestaurant,
                    type: data.method,
                },
                customer: {
                    first_name: data.firstname,
                    last_name: data.lastname,
                    email: data.email,
                    phone: data.phone,
                },
                order_items: cartItems.map((item) => ({
                    quantity: item.quantity,
                    name: item.name,
                    subtotal: item.price * item.quantity,
                    unit_price: item.price,
                    product_id: item.id,
                    comment: item.comment || "",
                })),
                order_status_history: [
                    {
                        status: "PENDING",
                    },
                ],
            };

            if (addressData) {
                orderPayload.address = addressData;
            }

            const response = await fetch('https://ehjbdvbicusntqbhlqun.supabase.co/functions/v1/add_order_with_items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderPayload),
            });

            if (!response.ok) {
                throw new Error('Problème lors de l\'envoi de la commande');
            }
            localStorage.setItem('userEmail', data.email);
            const responseData = await response.json();
            //console.log('Réponse de l\'API :', responseData);

            alert("Votre commande a bien été envoyée !");
            localStorage.removeItem('cartItems');
            navigate('/succes');
        } catch (error) {
            console.error("Erreur lors de l'envoi de la commande : ", error);
            alert('Une erreur est survenue lors de l\'envoi de la commande.');
        }
    };

    const updateQuantity = (id, delta) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + delta };
            }
            return item;
        }).filter(item => item.quantity > 0);

        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const handleCommentClick = (productId) => {
        const existingComment = cartItems.find(item => item.id === productId)?.comment || "";
        setTempComment(existingComment);
        setCommentProductId(productId);
        document.body.style.overflow = "hidden";
    };

    const handleCommentSubmit = () => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === commentProductId) {
                return { ...item, comment: tempComment || "" };
            }
            return item;
        });

        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        setCommentProductId(null);
        setTempComment("");
    };

    const handleCommentChange = (e) => {
        setTempComment(e.target.value);
    };

    const closeCommentInput = () => {
        setCommentProductId(null);
        setTempComment("");
        document.body.style.overflow = "";
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (commentProductId && !event.target.closest(".comment-input")) {
                closeCommentInput();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [commentProductId]);


    return (
        <div className="containerGlobalBasket">
            <div className="containerItemsBasket">
                <h2>Panier</h2>
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div key={item.id} className="containerBasketItem">
                            <div  className="basket-item">
                                <p className="name-item-basket"><span className="textGold">{item.quantity} x</span> - {item.name}</p>
                                <div className="container-btn-item">
                                    <span 
                                        className="material-symbols-outlined" 
                                        onClick={() => handleCommentClick(item.id)}
                                    >chat</span>
                                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                </div>
                                {commentProductId === item.id && (
                                    <div className="comment-input">
                                        <h3>Ajouter un commentaire à votre produit</h3>
                                        <textarea 
                                            placeholder="Ajouter un commentaire"
                                            value={tempComment}
                                            onChange={handleCommentChange}
                                            rows={3}
                                            resize="vertical"
                                        />
                                        <button className="button-comment" onClick={handleCommentSubmit}>Valider</button>
                                    </div>
                                )}
                            </div>
                        {item.comment && <p>*{item.comment}</p>}
                        </div>
                    ))
                ) : (
                    <div className="basket-empty">
                        <span className="material-symbols-outlined">production_quantity_limits</span>
                        <p>Votre panier est actuellement vide</p>
                    </div>
                )}
                {cartItems.length > 0 && (
                    <p className="total-price"><span className="textGold">Prix total :</span> {totalPrice.toFixed(2)} €</p>
                )}
            </div>

            <div className="containerFormBasket">

                <form onSubmit={handleSubmit(onSubmit)}>
                    {deliveryModes.length === 1 && (
                        <p className="delivery-mode-info">
                            Mode de livraison : <strong>{deliveryModes[0]?.label}</strong>
                        </p>
                    )}
                    <input type="text" placeholder="Prénom" {...register("firstname", { required: "Prénom requis" })} />
                    <p className="error-message">{errors.firstname?.message}</p>

                    <input type="text" placeholder="Nom" {...register("lastname", { required: "Nom requis" })} />
                    <p className="error-message">{errors.lastname?.message}</p>

                    <input type="email" placeholder="Email" {...register("email", { required: "Email requis" })} />
                    <p className="error-message">{errors.email?.message}</p>

                    <input type="tel" placeholder="Téléphone" {...register("phone", { required: "Téléphone requis" })} />
                    <p className="error-message">{errors.phone?.message}</p>

                    {watch("method") === "DELIVERY" && (
                        <div className="container-input-delivery">
                            <input type="text" placeholder="Code postal" {...register("postal_code")} />
                            <input type="text" placeholder="Pays" {...register("country")} />
                            <input type="text" placeholder="Ville" {...register("city")} />
                            <input type="text" placeholder="Adresse" {...register("street")} />
                        </div>
                    )}

                    {deliveryModes.length > 1 ? (
                        <select {...register("method", { required: "Sélectionnez un mode de livraison" })}>
                            <option value="">Mode de livraison</option>
                            {deliveryModes.map(({ value, label }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input type="hidden" {...register("method")} value={deliveryModes[0]?.value} />

                    )}
                    <p className="error-message">{errors.method?.message}</p>




                    <select className="select-payment" {...register("payment", { required: "Sélectionnez un mode de paiement" })}>
                        <option value="">Mode de paiement</option>
                        <option value="CASH">Espèces</option>
                        <option value="CB">Carte bancaire</option>
                    </select>
                    <p className="error-message">{errors.payment?.message}</p>

                    <textarea placeholder="Commentaire" {...register("comment")}></textarea>
                    <input style={{marginTop:"20px"}}  type="submit" value={"Commander"}/>
                </form>
            </div>
        </div>
    );
}

export default BasketComponent;