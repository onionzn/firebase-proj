import { useState } from 'react';
import { db } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import UpdateBox from '../UpdateBox/UpdateBox';
import "./TodoItem.css";

function TodoItem({ title, id, ifChecked, handleDelete, handleUpdate, dueDate }) {
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
    
    const timestampToString = (dueDate) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        };
        const date = dueDate.toDate();
        const dueDateString = date.toLocaleDateString(undefined, options);
        return dueDateString;
    }
    
    return (
        <div className={"todo-item-container"}>
            <div className={"first-row-container"}>
                <input type={'checkbox'} onChange={handleCheck} checked={checked}/>

                <span>{checked? <s>{title}</s> : title}</span>
            
                <div className={"inline-button-container"}>
                    <button onClick={() => {handleDelete(id)}}>Delete</button>
                    <button onClick={handleClickUpdateButton}>{displayUpdate? "Cancel": "Update"}</button>
                </div>
            </div>

            <p>Due Date: {timestampToString(dueDate)}</p>

            {displayUpdate? <UpdateBox handleUpdate={handleUpdate} id={id} setDisplayUpdate={setDisplayUpdate} title={title} dueDate={dueDate}/>: null}
        </div>        
    );
}

export default TodoItem;