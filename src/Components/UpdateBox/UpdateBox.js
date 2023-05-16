import { useState } from 'react';
import "./UpdateBox.css";
import { Timestamp } from 'firebase/firestore';

function UpdateBox({ handleUpdate, id, setDisplayUpdate, title, dueDate }) {
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedDate, setUpdatedDate] = useState(dueDate);

    const handleClickSaveButton = async () => {
        setDisplayUpdate(false);
        await handleUpdate(id, updatedTitle, updatedDate);
    }

    const handleChangeDueDate = (e) => {
        const date = new Date(e.target.value.split('-'));
        const timestamp = Timestamp.fromDate(date);
        setUpdatedDate(timestamp);
    }

    const handleChangeTitle = (e) => {
        setUpdatedTitle(e.target.value);
    }

    return (
        <div className={"update-item-box"}>
            <div className={"update-input-container"}>
                <label htmlFor="title">New Title:</label>
                <input id="title" className={"update-text-input"} onChange={handleChangeTitle} />
            </div>

            <div className={"update-input-container"}>
                <label htmlFor="date">Due Date:</label>
                <input type="date" id="date" onChange={handleChangeDueDate} />
            </div>

            <button onClick={handleClickSaveButton}>Save Update</button>
        </div>
    );
}

export default UpdateBox;