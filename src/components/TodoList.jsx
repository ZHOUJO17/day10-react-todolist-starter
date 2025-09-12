import {useContext} from "react";
import {TodoContext} from "../contexts/TodoContext";

const TodoList = () => {
    const {state, dispatch} = useContext(TodoContext)
    return <div>
        <div>This is the TodoList Component.</div>
        {
            state.map(todoItem => {
                return <div style={{width:"200px",border:"1px solid black",padding:"10px",marginBottom:"10px",justifySelf:"center"}}>{todoItem.text}</div>
            })
        }
    </div>
}

export default TodoList