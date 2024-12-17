export const fetchRestaurantData = async (restaurantId) => {
    try {
      const response = await fetch("https://ehjbdvbicusntqbhlqun.supabase.co/functions/v1/get_products_restaurant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ restaurant_id: restaurantId }),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de l'appel à l'Edge Function :", error);
      return { success: false, error: error.message };
    }
  };
  