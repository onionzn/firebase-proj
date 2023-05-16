import "./NewTaskEditBox.css";
import { useState } from 'react';
import {Timestamp} from 'firebase/firestore';

function NewTaskEditBox({ createItem, setDisplayNewTaskEditBox }) {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState();

    const handleClickAddTaskButton = async () => {
        setDisplayNewTaskEditBox(false);
        const timestamp = Timestamp.fromDate(new Date(date.split('-')));
        await createItem(title, timestamp);
    }

    const handleClickCancelButton = () => {
        setDisplayNewTaskEditBox(false);
    }

    return (
        <div>
            <div className={"new-task-input-container"}>
                <label htmlFor="title">Title:</label>
                <input id="title" onChange={(e) => {setTitle(e.target.value)}}/>
            </div>
            
            <div className={"new-task-input-container"}>
                <label htmlFor="date">Due Date:</label>
                <input type="date" id="date" onChange={(e) => {setDate(e.target.value)}} />
            </div>

            <div className={"new-task-button-container"}>
                <button onClick={handleClickAddTaskButton}>Add task</button>
                <button onClick={handleClickCancelButton}>Cancel</button>
            </div>
        </div>
    );
}

export default NewTaskEditBox;