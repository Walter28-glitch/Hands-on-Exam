import { useState } from 'react';

export default function Home() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn Next.js', completed: false },
    { id: 2, text: 'Build a CRUD app', completed: false },
    { id: 3, text: 'Deploy to GitHub', completed: true },
  ]);
 
  const [searchTerm, setSearchTerm] = useState('');
  const [newTodo, setNewTodo] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [activeTab, setActiveTab] = useState('todo'); // 'todo' or 'completed'

  
  const handleAdd = () => {
    if (newTodo.trim() === '') return;
    const newTodoItem = { id: Date.now(), text: newTodo, completed: false };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  
  const handleEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  
  const handleSave = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editId ? { ...todo, text: editText } : todo
      )
    );
    setEditId(null);
    setEditText('');
  };

  
  const handleCancel = () => {
    setEditId(null);
    setEditText('');
  };

  
  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = 
      (activeTab === 'todo' && !todo.completed) || 
      (activeTab === 'completed' && todo.completed);
    
    return matchesSearch && matchesTab;
  });

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>To-Do Application</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
      />

     
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Add new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
        <button 
          onClick={handleAdd} 
          style={{ marginLeft: '8px', padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}
        >
          Add
        </button>
      </div>

      
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('todo')}
          style={{ 
            flex: 1, 
            padding: '10px', 
            backgroundColor: activeTab === 'todo' ? '#2196F3' : '#e0e0e0',
            color: activeTab === 'todo' ? 'white' : 'black',
            border: 'none'
          }}
        >
          To Do
        </button>
        <button 
          onClick={() => setActiveTab('completed')}
          style={{ 
            flex: 1, 
            padding: '10px', 
            backgroundColor: activeTab === 'completed' ? '#2196F3' : '#e0e0e0',
            color: activeTab === 'completed' ? 'white' : 'black',
            border: 'none',
            marginLeft: '8px'
          }}
        >
          Completed
        </button>
      </div>

      {/* Todo List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
              padding: '10px',
              backgroundColor: '#f9f9f9',
              borderRadius: '4px'
            }}
          >
            {editId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ flex: 1, padding: '8px' }}
                />
                <button 
                  onClick={handleSave} 
                  style={{ marginLeft: '8px', backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '6px 12px' }}
                >
                  Save
                </button>
                <button 
                  onClick={handleCancel} 
                  style={{ marginLeft: '8px', backgroundColor: '#f44336', color: 'white', border: 'none', padding: '6px 12px' }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                  style={{ marginRight: '10px' }}
                />
                <span 
                  style={{ 
                    flex: 1, 
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#888' : 'black'
                  }}
                >
                  {todo.text}
                </span>
                <button 
                  onClick={() => handleEdit(todo)} 
                  style={{ 
                    marginLeft: '8px', 
                    backgroundColor: '#2196F3', 
                    color: 'white', 
                    border: 'none', 
                    padding: '6px 12px' 
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  style={{ 
                    marginLeft: '8px', 
                    backgroundColor: '#f44336', 
                    color: 'white', 
                    border: 'none', 
                    padding: '6px 12px' 
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      
      {filteredTodos.length === 0 && (
        <p style={{ textAlign: 'center', color: '#888' }}>
          {activeTab === 'todo' ? 'No todos found' : 'No completed todos found'}
        </p>
      )}
    </div>
  );
}
