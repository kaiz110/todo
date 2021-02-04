import React from 'react'
//redux / saga
import {createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './src/redux/reducer'
import saga from './src/saga'
//
import HomeScreen from './src/screens/HomeScreen'



const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer,applyMiddleware(sagaMiddleware))

const App = ()=>{
    return <Provider store={store}>
        <HomeScreen/>
    </Provider>
}

sagaMiddleware.run(saga)

export default App

