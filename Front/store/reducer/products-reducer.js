import { TRAE_PRODUCTS, TRAE_PRODUCT, ADD_TO_CART, REMOVE_ITEM, ADD_QUANTITY, SUB_QUANTITY, GET_CART, CHECKOUT, GET_ORDERS , TRAE_PRODUCTS_BY_TITLE} from '../constans'

const initialState = {
    product: {},
    products: [],
    addedItems: [],
    total: 0,
    lastOrders:[],

}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case TRAE_PRODUCTS:
            return { ...state, products: action.products };

        case TRAE_PRODUCTS_BY_TITLE:
            return { ...state, titleProducts: action.titleProducts };

        case TRAE_PRODUCT:
            return { ...state, product: action.product};

        case ADD_TO_CART:
            //FALTA LA LOGICA PARA EL CASO DE ESTAR MIRANDO 1 SOLO PRODUCTO ("Product")     
            let addedItem = state.products.find(item => item.id === action.id)
            //check if the action id exists in the addedItems
            let existed_item = state.addedItems.find(item => action.id === item.id)
            
            if (existed_item) {
                existed_item.quantity += 1
                return {
                    ...state,
                    total: state.total + existed_item.price
                }
            } else {
                let newItem = { ...addedItem, quantity: 1};
                //addedItem.quantity = 1;
                //calculating the total
                let newTotal = state.total + newItem.price

                return {
                    ...state,
                    addedItems: [...state.addedItems, newItem],
                    total: newTotal
                }
            };

        case REMOVE_ITEM:

            let itemToRemove= state.addedItems.find(item=> action.id === item.id)
            let new_items = state.addedItems.filter(item=> action.id !== item.id)
            
            //calculating the total
            let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
            console.log("Estoy por remover : ",itemToRemove)
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            };

        case ADD_QUANTITY:

            let itemToAdd = state.addedItems.find(item=> item.id === action.id)
            itemToAdd.quantity += 1 
            let newTotal2 = state.total + itemToAdd.price
            return{
              ...state,
              total: newTotal2
            };

        case SUB_QUANTITY:

            let itemToAdd2 = state.addedItems.find(item=> item.id === action.id) 
            //if the qt == 0 then it should be removed
            if(itemToAdd2.quantity === 1){
                itemToAdd2.quantity = 0 
                let new_items = state.addedItems.filter(item=>item.id !== action.id)
                let newTotal3 = state.total - itemToAdd2.price
                return{
                    ...state,
                    addedItems: new_items,
                    total: newTotal3
                }
              }
            else {
                itemToAdd2.quantity -= 1
                let newTotal3 = state.total - itemToAdd2.price
                return{
                      ...state,
                      total: newTotal3
                }
            };

        case GET_CART:
            return{
                      ...state,
                        addedItems : action.data.products,
                        total: action.data.total
                };

        case CHECKOUT:
            return{
                      ...state,
                        addedItems : [],
                        total: 0
                };

        case GET_ORDERS:
            console.log("ACTION.orders!",action.orders)
            return{
                      ...state,
                        lastOrders : action.orders,
                };

        default: return state;
    }
}