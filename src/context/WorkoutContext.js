// src/context/WorkoutContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const [workouts, setWorkouts] = useState(() => {
    const savedWorkouts = localStorage.getItem('workouts');
    if (!savedWorkouts) return [];
    try {
      const parsed = JSON.parse(savedWorkouts);
      // Фильтруем только валидные тренировки
      return parsed.filter(w =>
        w &&
        typeof w === 'object' &&
        w.id != null &&
        w.date &&
        w.type &&
        typeof w.duration === 'number'
      );
    } catch (e) {
      console.error('Ошибка парсинга тренировок из localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts]);

  const addWorkout = (workout) => {
    // 🔑 ВАЖНО: убедимся, что дата сохраняется в ISO формате
    const workoutToSave = {
      ...workout,
      id: Date.now(),
      date: new Date(workout.date).toISOString() // Преобразуем в ISO строку
    };
    setWorkouts(prev => [...prev, workoutToSave]);
  };

  const deleteWorkout = (id) => {
    setWorkouts(prev => prev.filter(workout => workout.id !== id));
  };

  const updateWorkout = (updatedWorkout) => {
    // 🔑 ВАЖНО: также преобразуем дату при обновлении
    const workoutToUpdate = {
      ...updatedWorkout,
      date: new Date(updatedWorkout.date).toISOString() // Преобразуем в ISO строку
    };
    setWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutToUpdate.id ? workoutToUpdate : workout
      )
    );
  };

  const value = {
    workouts,
    addWorkout,
    deleteWorkout,
    updateWorkout
  };

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkouts() {
  return useContext(WorkoutContext);
}