interface ProgressBarProps {
    progress: number;
    totalSteps: number;
}

const ProgressBar = ({ progress, totalSteps }: ProgressBarProps) => {
    const percent = (progress / totalSteps) * 100;
    
    return (
        <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden mb-4 mt-3">
            <div
                className="h-full bg-blue-500 transition-all"
                style={{ width: `${percent}%` }}
            />
        </div>
    );
};
export default ProgressBar;