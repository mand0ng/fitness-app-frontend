import { ArrowLeft, ArrowRight } from "@deemlol/next-icons"

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
}: CustomToolbarProps) => {
    const handlePrev = () => {
        if (enableBack) {
            onNavigate('PREV');
        }
    };

    const handleNext = () => {
        if (enableNext) {
            onNavigate('NEXT');
        }
    };

    return (
        <div className="flex flex-row justify-center items-center py-2 mb-2 gap-4">
            <button
                className={`px-2 py-1 rounded ${enableBack ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                onClick={handlePrev}
                disabled={!enableBack}
            >
                <ArrowLeft size={12} className="text-gray-600" />
            </button>
            <span className="text-xl font-bold">{label}</span>
            <button
                className={`px-2 py-1 rounded ${enableNext ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                onClick={handleNext}
                disabled={!enableNext}
            >
                <ArrowRight size={12} className="text-gray-600" />
            </button>
        </div>
    );
};

export default CustomCalendarToolbar;