import './App.css';
import { Auth } from "./Components/Auth";
import { db, auth } from "./config/firebase";
import { useState, useEffect } from 'react';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

function App() {
  const [itemList, setItemList] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");

  const itemsCollectionRef = collection(db, "todo-items");

  const getItemList = async () => {
    try {
      // Read data from db
      const data = await getDocs(itemsCollectionRef);
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

  const onCreateTask = async () => {
    try {
      await addDoc(itemsCollectionRef, {
        title: title, 
        description: description,
        userId: auth?.currentUser?.uid
      });
      getItemList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const itemDoc = doc(db, "todo-items", id);
      await deleteDoc(itemDoc);
      getItemList();
    } catch (err) {
      console.error(err);
    }
  }

  const updateTask = async (id) => {
    try {
      const itemDoc = doc(db, "todo-items", id);
      await updateDoc(itemDoc, {title: updatedTitle});
    } catch (err) {

    }
  }

  return (
    <div className="App">
      <Auth />

      <div>
        <input placeholder="title" onChange={(e) => {setTitle(e.target.value)}}/>
        <input placeholder="description" onChange={(e) => {setDescription(e.target.value)}}/>
        <button onClick={onCreateTask}>Add task</button>
      </div>

      <div>
        {itemList.map((item) => (
          <div>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <button onClick={() => {deleteTask(item.id)}}>Delete task</button>

            <input placeholder='new title' onChange={(e) => {setUpdatedTitle(e.target.value)}}/>
            <button onClick={() => {updateTask(item.id)}}>Update Title</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
