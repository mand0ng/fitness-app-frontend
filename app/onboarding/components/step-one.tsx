import ProgressBar from './progress-bar';

interface StepOneProps {
    visible?: boolean;
    gotoStep?: (step: number) => void;
}

const StepOne = ({ visible, gotoStep }: StepOneProps) => {
    if (!visible) return null;

    return (
        <div className="border border-(--muted) rounded-lg shadow-lg p-10 my-secondary-bg">
            <div className="m-5 flex flex-col items-center">
                <h1 className="text-2xl font-bold">Your Fitness Journey Starts Here</h1>
                <p className="text-sm sub-text text-center">Step 1 of 3: Basic Info and Goals</p>
                <ProgressBar progress={1} totalSteps={3} />
            </div>

            <div>
                <div>
                    <h1 className="text-md font-bold">Basic Information</h1>
                    {/* age */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="age">
                            Age
                        </label>
                        <input
                            type="number"
                            id="age"
                            className="w-full border border-(--muted) rounded-md p-2 primary-text"
                            placeholder="Enter your age"
                        />
                    </div>

                    {/* weight */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="weight">
                            Weight (kg)
                        </label>
                        <input
                            type="number"
                            id="weight"
                            className="w-full border border-(--muted) rounded-md p-2 primary-text"
                            placeholder="Enter your weight"
                        />
                    </div>

                    {/* height */}
                </div>

                <div>
                    <h1 className="text-md font-bold mt-6">Fitness Goals</h1>

                    {/* fitness level */}

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="fitness-level">
                            Select Your Fitness Level
                        </label>
                        <select
                            id="fitness-level"
                            className="w-full border border-(--muted) rounded-md p-2 primary-text"
                        >
                            <option value="">-- Select a level --</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="goals">
                            Select Your Primary Fitness Goal
                        </label>
                        <select
                            id="goals"
                            className="w-full border border-(--muted) rounded-md p-2 primary-text"
                        >
                            <option value="">-- Select a goal --</option>
                            <option value="lose-weight">Lose Weight</option>
                            <option value="build-muscle">Build Muscle</option>
                            <option value="improve-endurance">Improve Endurance</option>
                            <option value="general-fitness">General Fitness</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-center mt-6">
                    <button onClick={() => gotoStep && gotoStep(2)} className="w-8/10 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};
export default StepOne;