// src/components/WorkoutList/WorkoutList.jsx
import React, { useState } from 'react';
import { useWorkouts } from '../../context/WorkoutContext';
import WorkoutItem from '../WorkoutItem/WorkoutItem';
import WorkoutForm from '../WorkoutForm/WorkoutForm';
import { format, parseISO } from 'date-fns';
import './WorkoutList.css';

const WorkoutList = () => {
  const { workouts } = useWorkouts();
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  // Главное модальное окно
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = (workout) => {
    setSelectedWorkout(workout);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedWorkout(null);
    setModalOpen(false);
  };

  // Group and sort workouts by date, and sort within each date by time (ascending)
  const groupedWorkouts = {};
  workouts.forEach(workout => {
    if (!workout?.date) return;
    const date = format(parseISO(workout.date), 'yyyy-MM-dd');
    if (!groupedWorkouts[date]) {
      groupedWorkouts[date] = [];
    }
    groupedWorkouts[date].push(workout);
  });

  // 🔑 Сортировка внутри каждой даты по времени (по возрастанию)
  Object.keys(groupedWorkouts).forEach(date => {
    groupedWorkouts[date].sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      return timeA - timeB; // ascending: утро → вечер
    });
  });

  const sortedDates = Object.keys(groupedWorkouts).sort(); // сортировка дат

  const filteredWorkouts = {};
  sortedDates.forEach(date => {
    const filtered = groupedWorkouts[date].filter(workout => {
      if (!workout) return false;
      const matchesType =
        filterType === 'all' || workout.type === filterType;
      const matchesSearch =
        workout.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (workout.notes || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
    if (filtered.length > 0) {
      filteredWorkouts[date] = filtered;
    }
  });

  return (
    <div className="workout-list">
      <div className="workout-list__controls">
        <div className="workout-list__filter-group">
          <label htmlFor="filter-type" className="workout-list__filter-label">
            Фильтр по типу:
          </label>
          <select
            id="filter-type"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="workout-list__filter-select"
          >
            <option value="all">Все типы</option>
            <option value="Силовая тренировка">Силовые</option>
            <option value="Кардио">Кардио</option>
            <option value="Йога">Йога</option>
            <option value="Растяжка">Растяжка</option>
            <option value="Кроссфит">Кроссфит</option>
            <option value="Плавание">Плавание</option>
            <option value="Велосипед">Велосипед</option>
          </select>
        </div>
        <div className="workout-list__search-group">
          <label htmlFor="search" className="workout-list__search-label">
            Поиск:
          </label>
          <input
            id="search"
            type="text"
            placeholder="Поиск по заметкам или типу..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="workout-list__search-input"
          />
        </div>
      </div>

      {Object.keys(filteredWorkouts).length === 0 ? (
        <div className="workout-list__empty">
          <p>Нет запланированных тренировок. Добавьте первую тренировку!</p>
        </div>
      ) : (
        <div className="workout-list__container">
          {Object.entries(filteredWorkouts).map(([date, workouts]) => (
            <div key={date} className="workout-list__date-group">
              <h3 className="workout-list__date-header">
                {format(parseISO(`${date}T00:00:00`), 'dd MMMM yyyy')}
              </h3>
              <div className="workout-list__grid">
                {workouts.map(workout => (
                  <WorkoutItem
                    key={workout.id}
                    workout={workout}
                    onEdit={() => openModal(workout)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✨ Единое модальное окно */}
      <WorkoutForm
        isOpen={isModalOpen}
        onClose={closeModal}
        initialData={selectedWorkout}
      />
    </div>
  );
};

export default WorkoutList;