"use client";
import { useEffect, useState } from 'react';
import ProgressBar from './progress-bar';
import { User, IUser } from '../../models/user';

interface StepOneProps {
    gotoStep?: (step: number) => void;
    updateUserData?: (field: keyof IUser, value: any) => void;
    userData?: User;
}

const StepOne = ({gotoStep, updateUserData, userData }: StepOneProps) => {

    const [enableBtn, setEnableBtn] = useState(false);
    
    const validateForm = () => {
        if (userData?.stepOneCompleted()) {
            setEnableBtn(true);
        } else {
            setEnableBtn(false);
        }
    };

    const handleChange = (field: keyof IUser) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (updateUserData) {
            updateUserData(field, e.target.value);
            console.log(e.target.value);
        }
    };

    useEffect(() => {
        validateForm();
    }, [userData]);

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
                            value={userData?.age || ''}
                            onChange={handleChange('age')}
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
                            value={userData?.weight || ''}
                            onChange={handleChange('weight')}
                        />
                    </div>

                    {/* height */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="height">
                            Height (cm)
                            </label>
                        <input
                            type="number"
                            id="height"
                            className="w-full border border-(--muted) rounded-md p-2 primary-text"
                            placeholder="Enter your height"
                            value={userData?.height || ''}
                            onChange={handleChange('height')}
                        />
                    </div>
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
                            value={userData?.fitness_level || ''}
                            onChange={handleChange('fitness_level')}
                        >
                            <option value="">-- Select a level --</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advance">Advance</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="goals">
                            Select Your Primary Fitness Goal
                        </label>
                        <select
                            id="goals"
                            className="w-full border border-(--muted) rounded-md p-2 primary-text"
                            value={userData?.fitness_goal || ''}
                            onChange={handleChange('fitness_goal')}
                        >
                            <option value="">-- Select a goal --</option>
                            <option value="lose_weight">Lose Weight</option>
                            <option value="build_muscle">Build Muscle</option>
                            <option value="improve_endurance">Improve Endurance</option>
                            <option value="general_fitness">General Fitness</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-center mt-6">
                    <button disabled={!enableBtn} onClick={() => gotoStep && gotoStep(2)} className={`w-8/10 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md ${enableBtn ? '' : 'opacity-50 cursor-not-allowed'}`}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};
export default StepOne;