import {createStore} from 'redux';

const reducer = (state = [],action)=>{
    switch(action.type){
        case 'ADD_TODO':
            return [...state, {
                id: String(Date.now() * Math.random()),
                content: action.payload,
                done: false
            }]
        case 'IS_DONE':
            return state.map(value=>{
                if(value.id === action.payload){
                    return {...value, done: !value.done}
                }
                return value
            })
        case 'CHECKING':
            const group = state.find(value=>value.done === false)
            if(!group) return []
        default:
            return state
    }
}

export const store = createStore(reducer)