export const initialState = [
    {id: 1, text: "the first todo", done: false},
    {id: 2, text: "the second todo", done: false},
];

// reducer is a pure function that define and gather all state update logic
export const todoReducer = (state, action) => {
    if (action.type === "DONE") {
        return state.map(item => {
            if (item.id === action.id) {
                return {...item, done: !item.done}
            }
            return item
        })
        console.log(JSON.stringify(state))
    }
    return state;
};
