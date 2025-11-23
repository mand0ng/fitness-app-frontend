import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomCalendarToolbar from './custom-calendar-toolbar';
import { WorkoutProgram, WorkoutDay } from '@/types/workout';
import { useState } from 'react';

const localizer = momentLocalizer(moment);

interface MyCalendarProps {
    workoutData: WorkoutProgram | null;
}

interface CalendarEvent extends Event {
    workoutDay?: WorkoutDay;
    isRest?: boolean;
}

const MyCalendar = ({ workoutData }: MyCalendarProps) => {
    const [selectedDay, setSelectedDay] = useState<WorkoutDay | null>(null);
    const [currentDate, setCurrentDate] = useState<Date>(
        workoutData ? new Date(workoutData.start_date) : new Date()
    );

    // Convert workout data to calendar events
    const events: CalendarEvent[] = workoutData?.plan.map((day) => {
        const dayDate = new Date(day.date);
        return {
            title: day.type === 'rest' ? '🛌 Rest Day' : `💪 ${day.workout?.focus || 'Workout'}`,
            start: dayDate,
            end: dayDate,
            allDay: true,
            workoutDay: day,
            isRest: day.type === 'rest',
        };
    }) || [];

    const handleSelectEvent = (event: CalendarEvent) => {
        if (event.workoutDay) {
            setSelectedDay(event.workoutDay);
        }
    };

    const handleNavigate = (newDate: Date) => {
        setCurrentDate(newDate);
    };

    const eventStyleGetter = (event: CalendarEvent) => {
        const style: React.CSSProperties = {
            backgroundColor: event.isRest ? '#6b7280' : '#3b82f6',
            borderRadius: '5px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block',
        };
        return { style };
    };

    return (
        <div className='m-20'>
            <div>
                <h1 className="text-2xl font-bold mb-4 text-shadow-lg">Your Workout Calendar</h1>
                <p className='sub-text mb-6 text-sm'>
                    {workoutData ? 'Click on any day to view workout details!' : 'No workout plan yet.'}
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column: Calendar */}
                <div className="border border-(--muted) rounded-lg shadow-lg p-10 my-secondary-bg">
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500, width: '100%' }}
                        views={['month']}
                        date={currentDate}
                        onNavigate={handleNavigate}
                        toolbar={true}
                        onSelectEvent={handleSelectEvent}
                        eventPropGetter={eventStyleGetter}
                        components={{
                            toolbar: (toolbarProps) => (
                                <CustomCalendarToolbar
                                    label={toolbarProps.label}
                                    onNavigate={toolbarProps.onNavigate}
                                    enableBack={true}
                                    enableNext={true}
                                />
                            )
                        }}
                    />
                </div>

                {/* Right Column: Details Panel */}
                <div className="border border-(--muted) rounded-lg p-6 my-secondary-bg h-full min-h-[500px]">
                    {selectedDay ? (
                        // Selected Day View
                        <div className="h-full flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">
                                    Day {selectedDay.day} - {new Date(selectedDay.date).toLocaleDateString()}
                                </h2>
                                <button
                                    onClick={() => setSelectedDay(null)}
                                    className="text-sm text-muted-foreground hover:text-primary"
                                >
                                    Back to Overview
                                </button>
                            </div>

                            {selectedDay.type === 'rest' ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                                    <p className="text-6xl mb-4">🛌</p>
                                    <p className="text-2xl font-semibold">Rest Day</p>
                                    <p className="text-muted-foreground mt-2">
                                        Take it easy and recover!
                                    </p>
                                </div>
                            ) : selectedDay.workout ? (
                                <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                                    <div>
                                        <p className="text-lg font-semibold text-primary">Focus: {selectedDay.workout.focus}</p>
                                        <p className="text-sm text-muted-foreground">Duration: {selectedDay.workout.estimated_duration}</p>
                                    </div>

                                    {/* Warm-up */}
                                    <div>
                                        <h3 className="font-semibold mb-2 text-lg border-b border-(--muted) pb-1">Warm-up</h3>
                                        <div className="space-y-2">
                                            {selectedDay.workout.warm_up.map((exercise, idx) => (
                                                <div key={idx} className="flex justify-between text-sm">
                                                    <span>• {exercise.name}</span>
                                                    <span className="text-muted-foreground">{exercise.duration}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Exercises */}
                                    <div>
                                        <h3 className="font-semibold mb-2 text-lg border-b border-(--muted) pb-1">Exercises</h3>
                                        <div className="space-y-4">
                                            {selectedDay.workout.exercises.map((exercise, idx) => (
                                                <div key={idx} className="bg-(--card-background) p-3 rounded-md border border-(--muted)">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <p className="font-medium">{exercise.name}</p>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                                                        <p>{exercise.sets} sets × {exercise.reps}</p>
                                                        <p>Weight: {exercise.estimated_weight}</p>
                                                        <p>Rest: {exercise.rest}</p>
                                                    </div>
                                                    {exercise.notes && (
                                                        <p className="text-xs italic text-muted-foreground mt-2 border-t border-(--muted) pt-1">
                                                            Note: {exercise.notes}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Cooldown */}
                                    <div>
                                        <h3 className="font-semibold mb-2 text-lg border-b border-(--muted) pb-1">Cooldown</h3>
                                        <div className="space-y-2">
                                            {selectedDay.workout.cooldown.map((exercise, idx) => (
                                                <div key={idx} className="flex justify-between text-sm">
                                                    <span>• {exercise.name}</span>
                                                    <span className="text-muted-foreground">{exercise.duration}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 flex items-center justify-center">
                                    <p className="text-muted-foreground">No workout details available.</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Default View: Coach Notes
                        <div className="h-full flex flex-col">
                            <h2 className="text-xl font-bold mb-4 border-b border-(--muted) pb-2">Program Overview</h2>

                            <div className="flex-1 overflow-y-auto">
                                {workoutData?.notes_from_coach ? (
                                    <div className="mb-6">
                                        <h3 className="font-semibold mb-2 text-lg text-primary">Coach's Notes</h3>
                                        <div className="bg-(--card-background) p-4 rounded-lg border border-(--muted) italic text-muted-foreground">
                                            "{workoutData.notes_from_coach}"
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground mb-6">No coach notes available for this program.</p>
                                )}

                                <div className="flex flex-col items-center justify-center py-10 text-center opacity-60">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-lg font-medium">Select a day on the calendar</p>
                                    <p className="text-sm">Click any date to view your detailed workout plan</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default MyCalendar;