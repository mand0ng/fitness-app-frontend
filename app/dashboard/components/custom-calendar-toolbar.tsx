interface CustomToolbarProps {
    label: string;
    onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY') => void;
    enableBack?: boolean;
    enableNext?: boolean;
}

const CustomCalendarToolbar = ({
    label,
    onNavigate,
    enableBack = true,
    enableNext = true,
}: CustomToolbarProps) => (
    <div className="rbc-toolbar flex justify-center items-center py-2 mb-2 gap-4">
        <button
            className={`px-2 py-1 rounded ${enableBack ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            onClick={() => enableBack && onNavigate('PREV')}
            disabled={!enableBack}
        >
            Back
        </button>
        <span className="text-xl font-bold">{label}</span>
        <button
            className={`px-2 py-1 rounded ${enableNext ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            onClick={() => enableNext && onNavigate('NEXT')}
            disabled={!enableNext}
        >
            Next
        </button>
    </div>
);

export default CustomCalendarToolbar;