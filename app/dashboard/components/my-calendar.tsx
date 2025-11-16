import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomCalendarToolbar from './custom-calendar-toolbar';

const localizer = momentLocalizer(moment);

const myEventsList = [
    {
        title: 'Meeting with Trainer',
        start: new Date(2025, 10, 16, 10, 0),
        end: new Date(2025, 10, 16, 11, 0),
    },
    {
        title: 'Yoga Session',
        start: new Date(2025, 10, 12, 8, 0), // December 12, 2025, 8:00 AM
        end: new Date(2025, 10, 12, 9, 0),   // December 12, 2025, 9:00 AM
    },
    {
        title: 'Cardio Workout',
        start: new Date(2025, 10, 15, 18, 0), // December 15, 2025, 6:00 PM
        end: new Date(2025, 10, 15, 19, 0),   // December 15, 2025, 7:00 PM
    },
];

const MyCalendar = () => {
    return (
        <div className='m-20'>
            <div>
                <h1 className="text-2xl font-bold mb-4 text-shadow-lg">Your Calendar</h1>
                <p className='sub-text mb-6 text-sm'>
                    Your goals are waiting for you!
                </p>
            </div>
            <div className="border border-(--muted) rounded-lg shadow-lg p-10 my-secondary-bg flex items-start">
                <Calendar
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500, width: '100%' }}
                    views={['month']}
                    defaultDate={new Date(2025, 10, 1)} // display current month
                    toolbar={true}
                    components={{
                        toolbar: (toolbarProps) => (
                            <CustomCalendarToolbar
                                label={toolbarProps.label}
                                onNavigate={toolbarProps.onNavigate}
                                enableBack={true}   // set to false to disable "Back"
                                enableNext={true}   // set to false to disable "Next"
                            />
                        )
                    }}
                />
            </div>
        </div>
    );
}
export default MyCalendar;