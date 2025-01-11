const initialState={
    cart:{},
    user:{}
}

export default function rootReducer(state=initialState,action)
{
    switch(action.type)
    {
        case "Add_Cart":
            state.cart[action.payload[0]]=action.payload[1]
            
            return ({cart:state.cart,user:state.user})
        case "Delete_Cart":
            delete state.cart[action.payload[0]]
                    
            return ({cart:state.cart,user:state.user})   
        case "ADD_USER":
                state.user[action.payload[0]]=action.payload[1]
                
                return ({cart:state.cart,user:state.user})
        case "Clear_Cart":
                state.cart={}
                            
                return ({cart:state.cart,user:state.user})        
                         
        default:  
            return ({cart:state.cart,user:state.user})  
    }
}