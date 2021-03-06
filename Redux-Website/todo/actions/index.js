let nextTodoId = 0

export const addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text
    }
}

export const setVisibilityFIlter = (filter) => {
    return {
        type: 'SET_VISIBILTY_FILTER',
        filter
    }
}

export const toggleTodo = (id) => {
    return {
        type: "TOGGLE_TODO",
        id
    }
}