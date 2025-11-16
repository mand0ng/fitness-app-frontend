import ProgressBar from "./progress-bar";

interface StepTwoProps {
    visible?: boolean;
    gotoStep?: (step: number) => void;
}


const StepTwo = ({ visible, gotoStep }: StepTwoProps) => {
    if (!visible) return null;

    return (

        <div className="border border-(--muted) rounded-lg shadow-lg p-10 my-secondary-bg">
            <div>
                <div className="flex justify-between items-center text-sm sub-text">
                    <span>
                        Progress
                    </span>
                    <span>
                        Step 2 of 3
                    </span>
                </div>
                <ProgressBar progress={2} totalSteps={3} />

                <div className="text-center mt-10 flex flex-col items-center gap-3">
                    <h1 className="text-2xl font-bold">Preference & Availability</h1>
                    <p className="sub-text">Tell us how you like to workout and when you're available.</p>
                </div>

                <div className="mt-8">
                    <h1 className="text-lg font-bold">Workout Location Preferences</h1>
                    <div className="mt-2">
                        <p className="sub-text mt-2">
                            Where do you prefer to exercise?
                        </p>  
                        <div className="mt-2 flex flex-col md:flex-row gap-4 justify-center">
                            <label className="flex items-center gap-2">
                                <input type="radio" name="workout-location" value="home" />
                                Home Workouts
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="workout-location" value="gym" />
                                Gym Workouts
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="workout-location" value="both" />
                                Both Home and Gym
                            </label>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h1 className="text-lg font-bold">Days & Time Availability</h1>
                    <div className="mt-2">
                        <p className="sub-text mt-2">
                            When can you commit to workout?
                        </p>
                        <div className="mt-2 grid grid-cols-4 gap-3 justify-center">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="availability" value="Monday" />
                                Mondays
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="availability" value="Tuesday" />
                                Tuesdays
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="availability" value="Wednesday" />
                                Wednesdays
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="availability" value="Thursday" />
                                Thursdays
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="availability" value="Friday" />
                                Fridays
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="availability" value="Saturday" />
                                Saturdays
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="availability" value="Sunday" />
                                Sundays
                            </label>
                        </div>
                    </div>
                </div>

                {/* equipment options; bodyweight, dumbells, resistence bands, kettlebells, pull-up bar, yoga mat full gyms access */}

                <div className="mt-8">
                    <h1 className="text-lg font-bold">Available Equipment</h1>
                    <div className="mt-2">
                        <p className="sub-text mt-2">
                            What equipment do you have access to?
                        </p>
                        <div className="mt-2 grid grid-cols-3 gap-3 justify-center">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="equipment" value="bodyweight" />
                                Bodyweight
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="equipment" value="dumbbells" />
                                Dumbbells
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="equipment" value="resistance-bands" />
                                Resistance Bands
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="equipment" value="kettlebells" />
                                Kettlebells
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="equipment" value="pull-up-bar" />
                                Pull-up Bar
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="equipment" value="yoga-mat" />
                                Yoga Mat
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="equipment" value="full-gym-access" />
                                Full Gym Access
                            </label>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex justify-between items-center">
                    <button onClick={() => gotoStep && gotoStep(1)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md text-sm">
                        Back
                    </button>
                    <button onClick={() => gotoStep && gotoStep(3)} className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm">
                        Next
                    </button>
                </div>

            </div>
        </div>

    );
};

export default StepTwo;

