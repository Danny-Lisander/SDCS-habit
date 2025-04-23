import { useState } from 'react';

function HabitFormModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    color: '#ffa94d'
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
    setForm({ title: '', description: '', category: '', color: '#ffa94d' });
  };

  return (
    <div style={overlayStyle}>
      <form onSubmit={handleSubmit} style={modalStyle}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Новая привычка</h2>

        <input
          name="title"
          placeholder="Название"
          value={form.title}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="description"
          placeholder="Описание"
          value={form.description}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="category"
          placeholder="Категория"
          value={form.category}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={{ fontWeight: 'bold', marginTop: '10px' }}>Цвет:</label>
        <input
          type="color"
          name="color"
          value={form.color}
          onChange={handleChange}
          style={{
            width: '50px',
            height: '30px',
            border: 'none',
            background: 'none',
            marginBottom: '20px',
          }}
        />

        <button type="submit" style={{ ...buttonStyle, backgroundColor: '#ffa94d' }}>Сохранить</button>
        <button type="button" onClick={onClose} style={{ ...buttonStyle, backgroundColor: '#eee', color: '#333' }}>Отмена</button>
      </form>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 999,
};

const modalStyle = {
  backgroundColor: 'white',
  borderRadius: '10px',
  padding: '30px',
  width: '350px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
  display: 'flex',
  flexDirection: 'column',
};

const inputStyle = {
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '14px',
};

const buttonStyle = {
  padding: '10px',
  border: 'none',
  borderRadius: '6px',
  fontSize: '16px',
  color: 'white',
  cursor: 'pointer',
  marginBottom: '10px',
};

export default HabitFormModal;
