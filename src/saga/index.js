import {takeEvery, takeLatest, put, all,delay} from 'redux-saga/effects'
import AsyncStorage from '@react-native-async-storage/async-storage'


const setValue = async (key,value) => {
    try{
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key,jsonValue)
    }catch(e){}
}

const getValue = async (key) => {
    try{
        const value = await AsyncStorage.getItem(key)
        return JSON.parse(value)
    }catch(e){}
}

const removeValue = async () => {
    try{
        await AsyncStorage.clear()
    }catch(e){}
}
const fetch = async () => {
    const keys = await AsyncStorage.getAllKeys()
    const values = await AsyncStorage.multiGet(keys)

    // values: [['key','value'],['key','value'],...]
    return values
}

//WORKER
function* fetchSaga(){
    const rawData = yield fetch()
    const list = []
    for(let i = 0 ; i < rawData.length ; i++){
        const conData = JSON.parse(rawData[i][1])
        list.push(conData)
    }
    yield put({type: 'FETCH',payload: list})
    return list
}
function* addSaga(action){
    try{
        const id = String(Date.now() * Math.random())
        const newValue = {
            content: action.payload,
            done: false,
            id: id
        }
        yield setValue(id,newValue)
    }catch(e){
        console.log("add failed: " + e.message)
    }   
}
function* statusSaga(action){
    try{
        const todo = yield getValue(action.payload)
        const newTodo = {
            id: todo.id,
            content: todo.content,
            done: !todo.done
        }
        yield setValue(action.payload,newTodo)
        //update state
        yield put({type: 'DONE',payload: action.payload})
    }catch(e){
        console.log("status error : " + e.message)
    }  
}
function* checkSaga(){
    yield delay(100)
    const rawTodo = yield fetch()
    let doneTodo = []
    for(let i = 0 ; i < rawTodo.length ; i++){
        const conData = JSON.parse(rawTodo[i][1])
        doneTodo.push(conData.done)
    }

    //notDone = [false,true,...]
    const notDone = doneTodo.includes(false)
    if(!notDone){
        yield removeValue()
        yield put({type: 'CHECK'})
    }
}

//ROOT SAGA
export default function* rootSaga(){
    //yield all([
        yield takeEvery('ADD_TODO',addSaga),
        yield takeEvery('IS_DONE',statusSaga),
        yield takeLatest('CHECKING',checkSaga),
        yield takeLatest('FETCHING',fetchSaga)
    //])
}