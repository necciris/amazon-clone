export const initialState = {
    basket: [],
    user: null,
};

export const getTotalItem = (basket) => basket?.reduce((amount, item) => item.quantity + amount, 0);

export const getTotalPrice = (basket) => basket?.reduce((amount, item) => item.quantity * item.price + amount, 0);

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET': {
            let newBasket = [...state.basket];
            const findItemIdx = newBasket.findIndex((item) => item.id === action.item.id);
            if (findItemIdx >= 0) newBasket[findItemIdx].quantity += 1;
            else {
                let newItem = { ...action.item, quantity: 1 };
                newBasket = [...newBasket, newItem];
            }
            return { ...state, basket: newBasket };
        }
        case 'REDUCE_ITEM_BASKET': {
            let newBasket = [...state.basket];
            const findItemIdx = newBasket.findIndex((item) => item.id === action.id);
            if (findItemIdx >= 0) newBasket[findItemIdx].quantity -= 1;
            if (newBasket[findItemIdx].quantity === 0) {
                newBasket = newBasket.filter((item) => item.id !== action.id);
            }
            return { ...state, basket: newBasket };
        }
        case 'REMOVE_FROM_CART': {
            let newBasket = [...state.basket];
            newBasket = newBasket.filter((item) => item.id !== action.id);
            return { ...state, basket: newBasket };
        }
        case 'EMPTY_BASKET': {
            return { ...state, basket: [] };
        }
        case 'SET_USER': {
            return { ...state, user: action.user };
        }

        default:
            return state;
    }
};

export default reducer;
