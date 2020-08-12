import { LOGIN_USER, GET_CART } from "../constans";

const initialState = {
  data: { 
  	dataUser: {}, 
  	failLogin: false, 
  	redirect: false,
  }
};

export default function reducer(state = initialState, action) {
  
  switch (action.type) {

    case LOGIN_USER:

      return { ...state, data: action.data  };

    default:
    
      return state;

  }
}
