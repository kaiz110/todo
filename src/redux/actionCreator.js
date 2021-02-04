
export const addTodo = content => ({
    type: 'ADD_TODO',
    payload: content
})

export const isDone = id => ({
    type: 'IS_DONE',
    payload: id
})

export const check = (data)=>({
    type: 'CHECKING',
    payload: data
})

export const fetch = ()=>({
    type: 'FETCHING'
})

