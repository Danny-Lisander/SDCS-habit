function HabitCard({ habit, onDelete, onLogClick, isDoneToday }) {
  return (
    <div style={{
      backgroundColor: habit.color || '#fff7f0',
      padding: '16px',
      marginBottom: '10px',
      borderRadius: '10px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      position: 'relative',
    }}>
      <h3>{habit.title}</h3>
      <p>{habit.description}</p>
      <small>Категория: {habit.category}</small>
      {isDoneToday && <p style={{ color: 'green', marginTop: '8px' }}>Выполнено сегодня ✅</p>}
      <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
        <button
          onClick={() => !isDoneToday && onLogClick(habit)}
          disabled={isDoneToday}
          style={{
            backgroundColor: isDoneToday ? '#ccc' : '#4caf50',
            color: 'white',
            padding: '6px 12px',
            border: 'none',
            borderRadius: '6px',
            cursor: isDoneToday ? 'not-allowed' : 'pointer',
          }}
        >
          {isDoneToday ? 'Уже выполнено' : 'Отметить выполнение'}
        </button>

        <button
          onClick={() => onDelete(habit)}
          style={{
            backgroundColor: '#ff6b6b',
            color: 'white',
            padding: '6px 12px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}

  
  export default HabitCard;
  