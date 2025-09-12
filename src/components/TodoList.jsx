import {useContext} from "react";
import {TodoContext} from "../contexts/TodoContext";

const TodoList = () => {
    const {state, dispatch} = useContext(TodoContext)

    function handleItemClick(id) {
        dispatch({type:"DONE",id})
    }

    return <div>
        <div>This is the TodoList Component.</div>
        {
            state.map(({text,done,id}) => {
                return <div onClick={() => handleItemClick(id)} style={{width:"200px",border:"1px solid black",padding:"10px",marginBottom:"10px",justifySelf:"center",textDecoration:done? "line-through" : "auto"}}>{text}</div>
            })
        }
    </div>
}

export default TodoList