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
            <div className="border border-(--muted) rounded-lg shadow-lg p-10 my-secondary-bg flex items-start gap-6">
                <div className="flex-1">
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

                {/* Workout Details Panel */}
                {selectedDay && (
                    <div className="w-96 border border-(--muted) rounded-lg p-6 bg-background">
                        <h2 className="text-xl font-bold mb-4">
                            Day {selectedDay.day} - {new Date(selectedDay.date).toLocaleDateString()}
                        </h2>

                        {selectedDay.type === 'rest' ? (
                            <div className="text-center py-8">
                                <p className="text-4xl mb-4">🛌</p>
                                <p className="text-lg font-semibold">Rest Day</p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Take it easy and recover!
                                </p>
                            </div>
                        ) : selectedDay.workout ? (
                            <div className="space-y-4 max-h-[600px] overflow-y-auto">
                                <div>
                                    <p className="text-sm font-semibold text-primary">Focus: {selectedDay.workout.focus}</p>
                                    <p className="text-xs text-muted-foreground">Duration: {selectedDay.workout.estimated_duration}</p>
                                </div>

                                {/* Warm-up */}
                                <div>
                                    <h3 className="font-semibold mb-2">Warm-up</h3>
                                    <div className="space-y-1">
                                        {selectedDay.workout.warm_up.map((exercise, idx) => (
                                            <p key={idx} className="text-sm">
                                                • {exercise.name} - {exercise.duration}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                {/* Exercises */}
                                <div>
                                    <h3 className="font-semibold mb-2">Exercises</h3>
                                    <div className="space-y-3">
                                        {selectedDay.workout.exercises.map((exercise, idx) => (
                                            <div key={idx} className="border-l-2 border-primary pl-3">
                                                <p className="font-medium text-sm">{exercise.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {exercise.sets} sets × {exercise.reps} reps
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Weight: {exercise.estimated_weight} | Rest: {exercise.rest}
                                                </p>
                                                {exercise.notes && (
                                                    <p className="text-xs italic text-muted-foreground mt-1">
                                                        Note: {exercise.notes}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Cooldown */}
                                <div>
                                    <h3 className="font-semibold mb-2">Cooldown</h3>
                                    <div className="space-y-1">
                                        {selectedDay.workout.cooldown.map((exercise, idx) => (
                                            <p key={idx} className="text-sm">
                                                • {exercise.name} - {exercise.duration}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : null}

                        <button
                            onClick={() => setSelectedDay(null)}
                            className="mt-4 w-full px-4 py-2 bg-muted text-sm rounded-lg hover:bg-muted/80"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
export default MyCalendar;