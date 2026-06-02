export const initialStore=()=>{
  return{
    favorites: []
  }
}

export default function storeReducer(store, action = {}) {
   const {type, payload} = action
  switch(type){
    case 'ADD_FAVORITE':
      return{
        ...store, 
        favorites: store.favorites.some((item) => item.uid === payload.uid)
        ? store.favorites
        : [...store.favorites, payload]
      }
    ;


    case 'DELETE_FAVORITE':
      return {
        ...store, 
        favorites: store.favorites.filter((item)=> item.uid !== payload)
      };
    default:
      return store;
  }    
}
