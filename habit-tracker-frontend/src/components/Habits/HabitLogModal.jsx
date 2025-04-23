import { useState, useEffect } from "react";

function HabitLogModal({ isOpen, onClose, onLog, habit }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(false);
  }, [habit]);

  if (!isOpen || !habit) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLog(habit, isChecked);
    onClose();
  };

  return (
    <div style={overlayStyle}>
      <form onSubmit={handleSubmit} style={modalStyle}>
        <h3 style={{ marginBottom: "10px" }}>{habit.title}</h3>
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          Выполнено сегодня
        </label>
        <button
          type="submit"
          disabled={!isChecked}
          style={{
            ...saveButton,
            backgroundColor: isChecked ? "#ffa94d" : "#ccc",
            cursor: isChecked ? "pointer" : "not-allowed",
          }}
        >
          Сохранить
        </button>
        <button type="button" onClick={onClose} style={cancelButton}>
          Отмена
        </button>
      </form>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "10px",
  width: "300px",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const saveButton = {
  backgroundColor: "#ffa94d",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "6px",
  cursor: "pointer",
};

const cancelButton = {
  backgroundColor: "#eee",
  color: "#333",
  border: "none",
  padding: "10px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default HabitLogModal;
