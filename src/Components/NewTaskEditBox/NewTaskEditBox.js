import { useState } from 'react';

function NewTaskEditBox({ createItem, setDisplayNewTaskEditBox }) {
    const [title, setTitle] = useState("");

    const handleClickAddTaskButton = async () => {
        setDisplayNewTaskEditBox(false);
        await createItem(title);
    }

    const handleClickCancelButton = () => {
        setDisplayNewTaskEditBox(false);
    }

    return (
        <div>
            <input placeholder="Title..." onChange={(e) => {setTitle(e.target.value)}}/>
            <button onClick={handleClickAddTaskButton}>Add task</button>
            <button onClick={handleClickCancelButton}>Cancel</button>
        </div>
    );
}

export default NewTaskEditBox;