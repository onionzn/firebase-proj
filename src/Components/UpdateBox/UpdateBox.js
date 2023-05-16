import { useState } from 'react';

function UpdateBox({ handleUpdate, id, setDisplayUpdate }) {
    const [updatedTitle, setUpdatedTitle] = useState("");

    const handleClickSaveButton = async () => {
        setDisplayUpdate(false);
        await handleUpdate(id, updatedTitle);
    }

    return (
        <div>
            <input placeholder="New title..." onChange={(e) => {setUpdatedTitle(e.target.value)}}/>
            <button onClick={handleClickSaveButton}>Save Update</button>
        </div>
    );
}

export default UpdateBox;