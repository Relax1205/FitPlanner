// src/components/WorkoutForm/WorkoutForm.jsx
import React, { useState, useEffect } from 'react';
import { useWorkouts } from '../../context/WorkoutContext';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import './WorkoutForm.css';

const WorkoutForm = ({ isOpen, onClose, initialData = null }) => {
  const { addWorkout, updateWorkout } = useWorkouts();

  const [formData, setFormData] = useState({
    type: '',
    date: '',
    duration: '',
    notes: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        type: initialData.type || '',
        date: initialData.date ? new Date(initialData.date).toISOString().slice(0, 16) : '',
        duration: initialData.duration || '',
        notes: initialData.notes || ''
      });
    } else {
      setFormData({
        type: '',
        date: new Date().toISOString().slice(0, 16),
        duration: '',
        notes: ''
      });
    }
    setError('');
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { type, date, duration } = formData;

    if (!type || !date || !duration) {
      setError('Пожалуйста, заполните все обязательные поля.');
      return;
    }

    const workoutData = {
      ...formData,
      duration: Number(duration)
    };

    if (initialData) {
      updateWorkout({ ...workoutData, id: initialData.id });
    } else {
      addWorkout(workoutData);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <form className="workout-form" onSubmit={handleSubmit}>
        <h2 className="workout-form__title">
          {initialData ? 'Редактировать тренировку' : 'Новая тренировка'}
        </h2>

        {error && <div className="workout-form__error">{error}</div>}

        <div className="workout-form__content">
          <div className="workout-form__group">
            <label className="workout-form__label">Тип тренировки *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="workout-form__select"
              required
            >
              <option value="">Выберите тип</option>
              <option value="Силовая тренировка">Силовые</option>
              <option value="Кардио">Кардио</option>
              <option value="Йога">Йога</option>
              <option value="Растяжка">Растяжка</option>
              <option value="Кроссфит">Кроссфит</option>
              <option value="Плавание">Плавание</option>
              <option value="Велосипед">Велосипед</option>
            </select>
          </div>

          <div className="workout-form__group">
            <label className="workout-form__label">Дата и время *</label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="workout-form__input"
              required
            />
          </div>

          <div className="workout-form__group">
            <label className="workout-form__label">Продолжительность (минуты) *</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              min="1"
              className="workout-form__input"
              required
            />
          </div>

          <div className="workout-form__group">
            <label className="workout-form__label">Заметки</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="workout-form__textarea"
              placeholder="Описание, упражнения и т.д."
            />
          </div>

          <div className="workout-form__actions">
            <Button type="button" variant="secondary" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit" variant="primary">
              {initialData ? 'Сохранить' : 'Добавить'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default WorkoutForm;