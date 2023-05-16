import './TodoList.css';
import TodoItem from '../TodoItem/TodoItem';
import NewTaskEditBox from '../NewTaskEditBox/NewTaskEditBox';
import { useState, useEffect } from 'react';
import { db, auth } from "../../config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";


function TodoList() {
    // Whether to display the component for creating a new task at the bottom of the list
    const [displayNewTaskEditBox, setDisplayNewTaskEditBox] = useState(false);

    // A list of to-do items to display
    const [itemList, setItemList] = useState([]);

    const itemsCollectionRef = collection(db, "todo-items");

    const getItemList = async () => {
        try {
          // Read data from db t
          const q = query(itemsCollectionRef, where('userId', '==', auth.currentUser.uid));
          const data = await getDocs(q);
          const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
          // Update todo-item list
          setItemList(filteredData);
        } catch (err) {
          console.error(err);
        }
    };

    useEffect(() => {
        getItemList();
    }, []);

    const deleteItem = async (id) => {
        try {
            const itemDoc = doc(db, "todo-items", id);
            await deleteDoc(itemDoc);
            getItemList();
        } catch (err) {
            console.error(err);
        }
    }

    const updateItem = async (id, newTitle) => {
        try {
            const itemDoc = doc(db, "todo-items", id);
            await updateDoc(itemDoc, {title: newTitle});
            getItemList();
        } catch (err) {
            console.error(err);
        }
    }

    const createItem = async (title) => {
        try {
            await addDoc(itemsCollectionRef, {
              title: title,
              userId: auth?.currentUser?.uid
            });
            getItemList();
        } catch (err) {
            console.error(err);
        }
    }

    const onClickAddTaskButton = () => {
        setDisplayNewTaskEditBox(true);
    }

    return (
        <div>
            <div>
                {itemList.map((item) => (
                    <TodoItem 
                        title={item.title} 
                        id={item.id} 
                        ifChecked={item.checked} 
                        handleDelete={deleteItem}
                        handleUpdate={updateItem}
                        key={item.id}
                    />
                ))}
            </div>

            {displayNewTaskEditBox? 
                <NewTaskEditBox createItem={createItem} setDisplayNewTaskEditBox={setDisplayNewTaskEditBox}/>: 
                <button onClick={onClickAddTaskButton}>Add task</button>
            }
        </div>
    );
}

export default TodoList;