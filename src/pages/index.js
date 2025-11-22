import { useState } from 'react';

export default function Home() {
 
  const [items, setItems] = useState([
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Orange' },
  ]);
 
  const [searchTerm, setSearchTerm] = useState('');
  // State for new item input
  const [newItem, setNewItem] = useState('');
 
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');

  
  const handleAdd = () => {
    if (newItem.trim() === '') return;
    const newItemObj = { id: Date.now(), name: newItem };
    setItems([...items, newItemObj]);
    setNewItem('');
  };

  
  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

 
  const handleEdit = (item) => {
    setEditId(item.id);
    setEditName(item.name);
  };

  
  const handleSave = () => {
    setItems(
      items.map((item) =>
        item.id === editId ? { ...item, name: editName } : item
      )
    );
    setEditId(null);
    setEditName('');
  };

 
  const handleCancel = () => {
    setEditId(null);
    setEditName('');
  };

 
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>CRUD & Search - Next.js</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
      />

      {/* Add New Item */}
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Add new item..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
        <button onClick={handleAdd} style={{ marginLeft: '8px', padding: '8px 16px' }}>
          Add
        </button>
      </div>

      {/* Items List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredItems.map((item) => (
          <li
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            {editId === item.id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  style={{ flex: 1, padding: '8px' }}
                />
                <button onClick={handleSave} style={{ marginLeft: '8px' }}>
                  Save
                </button>
                <button onClick={handleCancel} style={{ marginLeft: '8px' }}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span style={{ flex: 1 }}>{item.name}</span>
                <button onClick={() => handleEdit(item)} style={{ marginLeft: '8px' }}>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{ marginLeft: '8px' }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

