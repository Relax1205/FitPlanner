import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import WorkoutForm from '../../components/WorkoutForm/WorkoutForm';
import WorkoutList from '../../components/WorkoutList/WorkoutList';
import CalendarView from '../../components/CalendarView/CalendarView';
import { Tabs, Tab } from '../../components/Tabs/Tabs';
import Button from '../../components/Button/Button';
import './PlannerPage.css';

const PlannerPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('create'); // create | edit
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const [activeTab, setActiveTab] = useState('list');
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location]);

  const openCreateForm = () => {
    setFormMode('create');
    setSelectedWorkout(null);
    setIsFormOpen(true);
  };

  const openEditForm = (workout) => {
    setFormMode('edit');
    setSelectedWorkout(workout);
    setIsFormOpen(true);
  };

  return (
    <div className="planner-page">
      <div className="planner-page__header">
        <h1 className="planner-page__title">Планировщик тренировок</h1>
        <Button variant="success" onClick={openCreateForm} className="planner-page__add-button">
          + Добавить тренировку
        </Button>
      </div>

      <Tabs activeTab={activeTab} onTabChange={setActiveTab}>
        <Tab id="list" label="Список">
          <WorkoutList onEdit={openEditForm} />
        </Tab>
        <Tab id="calendar" label="Календарь">
          <CalendarView onEdit={openEditForm} />
        </Tab>
      </Tabs>

      <WorkoutForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={formMode === 'edit' ? selectedWorkout : null}
      />
    </div>
  );
};

export default PlannerPage;
