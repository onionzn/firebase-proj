import { useState } from 'react';
import { db } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import UpdateBox from '../UpdateBox/UpdateBox';
import "./TodoItem.css";

function TodoItem({ title, id, ifChecked, handleDelete, handleUpdate }) {
    const [checked, setChecked] = useState(ifChecked);
    const [displayUpdate, setDisplayUpdate] = useState(false);

    const handleCheck = async () => {
        try {
            const itemDoc = doc(db, "todo-items", id);
            await updateDoc(itemDoc, {checked: !checked});
            setChecked(!checked);
        } catch (err) {
            console.error(err);
        }
    }

    const handleClickUpdateButton = () => {
        setDisplayUpdate(!displayUpdate);
    }

    return (
        <div className={"todo-item"}>
            <input type={'checkbox'} onChange={handleCheck} checked={checked}/>
            <span>{checked? <s>{title}</s> : title}</span>
            <button onClick={() => {handleDelete(id)}}>Delete</button>
            <button onClick={handleClickUpdateButton}>{displayUpdate? "Cancel": "Update"}</button>
            {displayUpdate? <UpdateBox handleUpdate={handleUpdate} id={id} setDisplayUpdate={setDisplayUpdate}/>: null}
        </div>
    );
}

export default TodoItem;