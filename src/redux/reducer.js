

const reducer = (state = [],action)=>{
    switch(action.type){
        case 'DONE':
            return state.map(value=>{
                if(value.id === action.payload){
                    return {...value, done: !value.done}
                }
                return value
            })
        case 'CHECK':
            return []
        case 'FETCH':
            return action.payload
        default:
            return state
    }
}

export default reducer
