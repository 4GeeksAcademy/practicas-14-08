export const initialStore=()=>{
  return{
    favorites: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'favorites':
      return {
        ...store,
        favorites: action.payload
      };
      
    
    default:
      throw Error('Unknown action.');
  }    
}
