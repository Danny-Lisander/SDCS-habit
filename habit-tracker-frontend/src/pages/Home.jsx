import { useState } from "react";
import HabitFormModal from "../components/Habits/HabitFormModal";
import HabitCard from "../components/Habits/HabitCard";
import HabitLogModal from "../components/Habits/HabitLogModal";
import { useEffect } from "react";
import { getHabits } from "../services/api";
import "../styles/Auth.css";

function Home() {
  const [habits, setHabits] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [selectedHabit, setSelectedHabit] = useState(null);
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [habitLogs, setHabitLogs] = useState([]); // временно

  const isHabitDoneToday = (habit) => {
    return habitLogs.some(
      (log) =>
        log.habitId === habit.title &&
        log.date === new Date().toDateString()
    );
  };  

  const handleLog = (habit, done) => {
    if (done) {
      setHabitLogs([
        ...habitLogs,
        { habitId: habit.title, date: new Date().toDateString() },
      ]);
    }
  };

  const addHabit = (habit) => {
    setHabits([...habits, habit]);
  };

  const deleteHabit = (habitToDelete) => {
    setHabits(habits.filter((habit) => habit !== habitToDelete));
  };

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await getHabits();
        setHabits(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке привычек:", error);
        alert("Не удалось загрузить привычки. Попробуйте снова.");
      }
    };
  
    fetchHabits();
  }, []);

  return (
    <>
      <header>Habit Tracker</header>
      <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
        <button onClick={() => setShowModal(true)} style={plusButtonStyle}>
          ➕ Добавить привычку
        </button>

        <HabitFormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={addHabit}
        />

        <HabitLogModal
          isOpen={logModalOpen}
          onClose={() => setLogModalOpen(false)}
          onLog={handleLog}
          habit={selectedHabit}
        />

        <div style={{ marginTop: "30px" }}>
          {habits.length === 0 && <p>Пока нет привычек. Добавьте первую!</p>}
          {habits.map((habit, index) => (
          <HabitCard
            key={index}
            habit={habit}
            onDelete={deleteHabit}
            onLogClick={(habit) => {
              setSelectedHabit(habit);
              setLogModalOpen(true);
            }}
            isDoneToday={isHabitDoneToday(habit)}
          />
        ))}
        </div>
      </div>
    </>
  );
}

const plusButtonStyle = {
  backgroundColor: "#ffa94d",
  color: "white",
  padding: "10px 20px",
  fontSize: "16px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
};

export default Home;
