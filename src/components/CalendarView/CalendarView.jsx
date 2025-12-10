// src/components/CalendarView/CalendarView.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useWorkouts } from '../../context/WorkoutContext';
import { format, parseISO, isSameDay } from 'date-fns';
import { ru } from 'date-fns/locale';
import './CalendarView.css';

const CalendarView = () => {
  const { workouts } = useWorkouts();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Group workouts by date for quick lookup
  const workoutsByDate = workouts.reduce((acc, workout) => {
    const date = format(parseISO(workout.date), 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(workout);
    return acc;
  }, {});

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const dayWorkouts = workoutsByDate[formattedDate] || [];
      if (dayWorkouts.length > 0) {
        return (
          <div className="calendar-view__tile-content">
            <div className="calendar-view__workout-count">
              {dayWorkouts.length}
            </div>
          </div>
        );
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const hasWorkouts = workoutsByDate[formattedDate];
      if (hasWorkouts) {
        return 'calendar-view__tile--has-workouts';
      }
      if (isSameDay(date, new Date())) {
        return 'calendar-view__tile--today';
      }
    }
    return null;
  };

  // 🔑 Сортируем тренировки по времени (по возрастанию)
  const getWorkoutsForDate = () => {
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    const dayWorkouts = workoutsByDate[formattedDate] || [];
    return dayWorkouts.sort((a, b) => {
      return new Date(a.date) - new Date(b.date); // утро → вечер
    });
  };

  return (
    <div className="calendar-view">
      <div className="calendar-view__wrapper">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={tileContent}
          tileClassName={tileClassName}
          locale="ru"
          calendarType="US"
        />
      </div>
      <div className="calendar-view__day-workouts">
        <h3 className="calendar-view__day-title">
          Тренировки на {format(selectedDate, 'dd MMMM yyyy', { locale: ru })}
        </h3>
        {getWorkoutsForDate().length === 0 ? (
          <p className="calendar-view__no-workouts">Нет запланированных тренировок</p>
        ) : (
          <div className="calendar-view__workouts-list">
            {getWorkoutsForDate().map(workout => (
              <div key={workout.id} className="calendar-view__workout-item">
                <div className="calendar-view__workout-time">
                  {format(parseISO(workout.date), 'HH:mm')}
                </div>
                <div className="calendar-view__workout-details">
                  <div className="calendar-view__workout-type">{workout.type}</div>
                  <div className="calendar-view__workout-duration">
                    ⏱️ {workout.duration} минут
                  </div>
                  {workout.notes && (
                    <div className="calendar-view__workout-notes">{workout.notes}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;