// src/components/WorkoutItem/WorkoutItem.jsx
import React, { useState } from 'react';
import { useWorkouts } from '../../context/WorkoutContext';
import { format, parseISO } from 'date-fns';
import Button from '../Button/Button';
import './WorkoutItem.css';

const WorkoutItem = ({ workout, onEdit }) => {
  // 🔑 ВСЕ ХУКИ — СТРОГО В НАЧАЛЕ, ДО ЛЮБОЙ ЛОГИКИ
  const { deleteWorkout } = useWorkouts();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // 🔑 Защита от undefined — НО ПОСЛЕ ХУКОВ
  if (!workout || typeof workout !== 'object' || workout.id == null) {
    console.warn('WorkoutItem получил некорректные данные:', workout);
    return null;
  }

  const handleDelete = () => {
    deleteWorkout(workout.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="workout-item">
      <div className="workout-item__header">
        <h4 className="workout-item__type">{workout.type}</h4>
        <div className="workout-item__time">
          {format(parseISO(workout.date), 'HH:mm')}
        </div>
      </div>
      <div className="workout-item__body">
        <div className="workout-item__duration">
          ⏱️ {workout.duration} минут
        </div>
        {workout.notes && (
          <div className="workout-item__notes">
            <p>{workout.notes}</p>
          </div>
        )}
      </div>
      <div className="workout-item__footer">
        <Button 
          variant="secondary"
          size="small"
          onClick={() => onEdit && onEdit(workout)}
          aria-label="Редактировать тренировку"
        >
          ✏️
        </Button>
        <Button 
          variant="secondary"
          size="small"
          onClick={() => setShowDeleteConfirm(true)}
          aria-label="Удалить тренировку"
        >
          🗑️
        </Button>
      </div>

      {showDeleteConfirm && (
        <div className="workout-item__delete-confirm">
          <p>Вы уверены, что хотите удалить эту тренировку?</p>
          <div className="workout-item__delete-buttons">
            <Button 
              variant="secondary" 
              size="small"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Отмена
            </Button>
            <Button 
              variant="danger" 
              size="small"
              onClick={handleDelete}
            >
              Удалить
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutItem;