export const initialState = {
    favorites: []
};

export const globalReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_FAVORITE':
            if (state.favorites.some(fav => fav.uid === action.payload.uid)) {
                return state; 
            }
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            };

        case 'REMOVE_FAVORITE':
            return {
                ...state,
                favorites: state.favorites.filter(fav => fav.uid !== action.payload.uid)
            };

        default:
            return state;
    }
};
