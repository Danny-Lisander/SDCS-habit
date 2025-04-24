import { useState, useEffect } from "react";
import HabitFormModal from "../components/Habits/HabitFormModal";
import HabitCard from "../components/Habits/HabitCard";
import HabitLogModal from "../components/Habits/HabitLogModal";
import {
  getHabits,
  deleteHabit as deleteHabitFromApi,
  getHabitLogs,
  logHabit,
} from "../services/api";
import "../styles/Auth.css";

function Home() {
  const [habits, setHabits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [habitLogs, setHabitLogs] = useState([]);

  const isHabitDoneToday = (habit) => {
    const today = new Date().toDateString();
    return habitLogs.some((log) => {
      return (
        log.habit_id === habit.id &&
        new Date(log.date).toDateString() === today
      );
    });
  };
  

  const handleLog = async (habit, done) => {
    if (done) {
      try {
        await logHabit(habit.id);
        const today = new Date().toISOString().split("T")[0];
        setHabitLogs([...habitLogs, { habit_id: habit.id, date: today }]);
      } catch (error) {
        console.error("Ошибка при отметке выполнения:", error);
        alert("Ошибка при отметке выполнения привычки");
      }
    }
  };

  const addHabit = (habit) => {
    setHabits([...habits, habit]);
  };

  const deleteHabit = async (habitToDelete) => {
    try {
      await deleteHabitFromApi(habitToDelete.id);
      setHabits(habits.filter((habit) => habit.id !== habitToDelete.id));
    } catch (error) {
      console.error("Ошибка при удалении привычки", error);
      alert("Ошибка при удалении привычки");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [habitRes, logsRes] = await Promise.all([
          getHabits(),
          getHabitLogs(),
        ]);
        setHabits(habitRes.data);
        setHabitLogs(logsRes.data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        alert("Не удалось загрузить данные. Попробуйте снова.");
      }
    };

    fetchData();
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
