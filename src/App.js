import { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [todolist, setTodolist] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  function display(e) {
    setMessage(e.target.value);
  }

  function addToList() {
    if (message === '') {
      alert('Please insert something!');
      return;
    }
    if (editIndex !== null) {
      const updatedList = [...todolist];
      updatedList[editIndex] = message;
      setTodolist(updatedList);
      setEditIndex(null);
    } else {
      setTodolist([...todolist, message]);
    }
    setMessage('');
  }

  const deleteItem = (index) => {
    const newTodo = todolist.filter((_, i) => i !== index);
    setTodolist(newTodo);
    setEditIndex(null);
  };

  const startEditing = (index) => {
    setMessage(todolist[index]);
    setEditIndex(index);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addToList();
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        id="input"
        value={message}
        onChange={display}
        onKeyDown={handleKeyDown}
        className="inputBox"
      />
      <button onClick={addToList} className="addButton">
        {editIndex !== null ? 'Update' : 'Add'}
      </button>
      {/* <div className="message">Here is what you are typing now: {message}</div> */}
      {/* <p className="todoTitle">Your to-do list is as follows:</p> */}
      <ul className="todoListContainer">
        {todolist.map((item, index) => (
          <li key={index} className="todoListItem">
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={message}
                  onChange={display}
                  className="editInput"
                />
                <button onClick={() => addToList()} className="saveButton">
                  Save
                </button>
              </>
            ) : (
              <>
                {item}
                <button onClick={() => startEditing(index)} className="editButton">
                  <i className="fas fa-pen"></i>
                </button>
                <button onClick={() => deleteItem(index)} className="deleteButton">
                  <i className="fas fa-trash-alt"></i>
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      {todolist.length > 0 ? (
        <button onClick={() => setTodolist([])} className="deleteAllButton">
          Delete All
        </button>
      ) : null}
    </div>
  );
}

export default App;




