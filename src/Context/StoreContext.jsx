import { createContext,useState } from "react";
import { food_list } from "../assets/assets";  // Import the food list from assets

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItem, setCartItem] = useState({});
    const url = "http://localhost:4000"
    const [token ,setToken] = useState();

    // Function to add item to cart, increments the count if the item exists
    const addToCart = (itemId) => {
        setCartItem((prev) => {
            const currentCount = prev[itemId] || 0;  // If item doesn't exist, default to 0
            return { ...prev, [itemId]: currentCount + 1 };  // Increment the count by 1
        });
    };

    // Function to remove item from cart, decrements the count and removes it if count reaches 0
    const removeFromCart = (itemId) => {
        setCartItem((prev) => {
            const currentCount = prev[itemId] || 0;  // If item doesn't exist, default to 0
            if (currentCount > 1) {
                return { ...prev, [itemId]: currentCount - 1 };  // Decrease the count by 1
            } else {
                const { [itemId]: _, ...rest } = prev;  // Remove the item completely when count is 1
                return rest;
            }
        });
    };


    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItem){
            if (cartItem[item]>0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItem[item];  
            }
           
            }
        return totalAmount;
    }

    
    // Optional: Log the cart state every time it changes
    // useEffect(() => {
    //     console.log(cartItem);
    // }, [cartItem]);

    // Context value to provide to the components
    const contextValue = {
        food_list,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}  {/* Render all the children passed to the provider */}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;




























// import { createContext, useEffect, useState } from "react";
// // import { food_list } from "../assets/assets";  // Import the food list from assets
// import axios from 'axios'

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
    
//     const [cartItem, setCartItem] = useState({});
//     const url = "http://localhost:4000"
//     const [token ,setToken] = useState();
//     const [food_list,setFoodList] = useState([])

//     // Function to add item to cart, increments the count if the item exists
//     const addToCart = (itemId) => {
//         setCartItem((prev) => {
//             const currentCount = prev[itemId] || 0;  // If item doesn't exist, default to 0
//             return { ...prev, [itemId]: currentCount + 1 };  // Increment the count by 1
//         });
//     };

//     // Function to remove item from cart, decrements the count and removes it if count reaches 0
//     const removeFromCart = (itemId) => {
//         setCartItem((prev) => {
//             const currentCount = prev[itemId] || 0;  // If item doesn't exist, default to 0
//             if (currentCount > 1) {
//                 return { ...prev, [itemId]: currentCount - 1 };  // Decrease the count by 1
//             } else {
//                 const { [itemId]: _, ...rest } = prev;  // Remove the item completely when count is 1
//                 return rest;
//             }
//         });
//     };


//     const getTotalCartAmount=()=>{
//         let totalAmount=0;
//         for(const item in cartItem){
//             if (cartItem[item]>0) {
//                 let itemInfo = food_list.find((product) => product._id === item);
//                 totalAmount += itemInfo.price * cartItem[item];  
//             }
           
//             }
//         return totalAmount;
//     }


//     const fetchFoodList = async ()=>{
//         const response = await axios.get(url+"/api/food/list");
//         setFoodList(response.data.data)
//     }

// useEffect(()=>{
//     async function loadData(){
//         await fetchFoodList();
//         if (localStorage.getItem("token")) {
//             setToken(localStorage.getItem("token"));
            
//         }
//     }
//     loadData();
// },[])
    
//     // Optional: Log the cart state every time it changes
//     // useEffect(() => {
//     //     console.log(cartItem);
//     // }, [cartItem]);

//     // Context value to provide to the components
//     const contextValue = {
//         food_list,
//         cartItem,
//         setCartItem,
//         addToCart,
//         removeFromCart,
//         getTotalCartAmount,
//         url,
//         token,
//         setToken
//     };

//     return (
//         <StoreContext.Provider value={contextValue}>
//             {props.children}  {/* Render all the children passed to the provider */}
//         </StoreContext.Provider>
//     );
// };

// export default StoreContextProvider;
