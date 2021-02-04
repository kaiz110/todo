import {createStore} from 'redux';
//import AsyncStorage from '@react-native-async-storage/async-storage'

//value = object
// const setValue = async (key,value) => {
//     try{
//         const jsonValue = JSON.stringify(value)
//         await AsyncStorage.setItem(key,value)
//     }catch(e){}
// }

// const getValue = async (key) => {
//     try{
//         const value = await AsyncStorage.getItem(key)
//         return value != null ? JSON.parse(value) : null
//     }catch(e){}
// }

// const removeValue = async (key) => {
//     try{
//         await AsyncStorage.removeItem(key)
//     }catch(e){}
// }
// const fetch = async () => {
//     await AsyncStorage.clear()
//     const keys = await AsyncStorage.getAllKeys()
//     const values = await AsyncStorage.multiGet(keys)

//     const data = []
//     for(let i = 0 ; i < values.length ; i++){
//         data.push(values[i][1])
//     }
//     console.log(data)
//     return data
// }


//REDUCER
const reducer = (state = [],action)=>{
    switch(action.type){
        case 'ADD_TODO':
            const id = String(Date.now() * Math.random())
            // const data = {
            //     content: action.payload,
            //     done: false,
            //     id: id
            // }
            // setValue(id,JSON.stringify(data))
            return [...state,{
                content: action.payload,
                done: false,
                id: id
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
            console.log({...group})
            if(!group) return []
        default:
            return state
    }
}

export const store = createStore(reducer)