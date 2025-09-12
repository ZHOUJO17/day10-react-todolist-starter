export const initialState = [
    {id: 1, text: "the first todo", done: false},
    {id: 2, text: "the second todo", done: false},
];

let nextId = 3; // Start from 3 since we already have two todos in the initialState

// reducer is a pure function that define and gather all state update logic
const todoReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: nextId++,
                    text: action.payload,
                    done: false
                }
            ];
        case 'TOGGLE_TODO':
            return state.map(todo =>
                todo.id === action.payload
                    ? { ...todo, done: !todo.done }
                    : todo
            );
        default:
            return state;
    }
};

export default todoReducer