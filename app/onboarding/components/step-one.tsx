"use client";
import { useEffect, useState } from 'react';
import ProgressBar from './progress-bar';
import { IUser } from '@/context/user-context';
import { isUserStepOneCompleted } from '@/utils/utils';

interface StepOneProps {
    gotoStep: (step: number) => void;
    updateUserDetails: (field: keyof IUser, value: any) => void;
    userDetails: IUser | null;
}

const StepOne = ({ gotoStep, updateUserDetails, userDetails }: StepOneProps) => {
    const [enableBtn, setEnableBtn] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof IUser, string>>>({});
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [gender, setGender] = useState('');
    const [fitnessLevel, setFitnessLevel] = useState('');
    const [fitnessGoal, setFitnessGoal] = useState('');

    const enableNextStepButton = () => {
        if (isUserStepOneCompleted(userDetails || null)) {
            setEnableBtn(true);
        } else {
            setEnableBtn(false);
        }
    };

    const validateField = (field: keyof IUser, value: any): string | null => {
        switch (field) {
            case 'age':
                const age = Number(value);
                if (!value || value === '') return null; // Allow empty for user to type
                if (isNaN(age)) return 'Age must be a number';
                if (age < 16) return 'Age must be at least 16';
                if (age > 80) return 'Age must be 80 or less';
                return null;

            case 'weight':
                const weight = Number(value);
                if (!value || value === '') return null;
                if (isNaN(weight)) return 'Weight must be a number';
                if (weight < 40) return 'Weight must be at least 40kg';
                if (weight > 200) return 'Weight must be 200kg or less';
                return null;

            case 'height':
                const height = Number(value);
                if (!value || value === '') return null;
                if (isNaN(height)) return 'Height must be a number';
                if (height < 100) return 'Height must be at least 100cm';
                if (height > 250) return 'Height must be 250cm or less';
                return null;

            case 'gender':
                if (!value || value === '') return null;
                if (!['male', 'female'].includes(value)) return 'Please select a valid gender';
                return null;

            case 'fitnessLevel':
                if (!value || value === '') return null;
                if (!['beginner', 'intermediate', 'advance'].includes(value)) return 'Please select a valid fitness level';
                return null;

            case 'fitnessGoal':
                if (!value || value === '') return null;
                const validGoals = ['lose weight', 'build muscle', 'improve endurance', 'general fitness'];
                if (!validGoals.includes(value)) return 'Please select a valid fitness goal';
                return null;

            default:
                return null;
        }
    };

    const handleChange = (field: keyof IUser) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.value;

        // Validate the field
        const error = validateField(field, value);

        // Update errors state
        setErrors(prev => ({
            ...prev,
            [field]: error || undefined
        }));

        // Only update user details if there's no error and value is not empty
        if (!error && value !== '') {
            updateUserDetails(field, value);
        }
    };

    useEffect(() => {
        enableNextStepButton();
    }, [userDetails]);

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
                            className={`w-full border ${errors.age ? 'border-red-500' : 'border-(--muted)'} rounded-md p-2 primary-text`}
                            placeholder="Enter your age"
                            value={userDetails?.age || ''}
                            onChange={handleChange('age')}
                        />
                        {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                    </div>

                    {/* gender */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="gender">
                            Birth Gender
                        </label>
                        <select
                            id="gender"
                            className="w-full border border-(--muted) rounded-md p-2 primary-text"
                            value={userDetails?.gender || ''}
                            onChange={handleChange('gender')}
                        >
                            <option value="">-- Select birth gender --</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    {/* weight */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="weight">
                            Weight (kg)
                        </label>
                        <input
                            type="number"
                            id="weight"
                            className={`w-full border ${errors.weight ? 'border-red-500' : 'border-(--muted)'} rounded-md p-2 primary-text`}
                            placeholder="Enter your weight"
                            value={userDetails?.weight || ''}
                            onChange={handleChange('weight')}

                        />
                        {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight}</p>}
                    </div>

                    {/* height */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="height">
                            Height (cm)
                        </label>
                        <input
                            type="number"
                            id="height"
                            className={`w-full border ${errors.height ? 'border-red-500' : 'border-(--muted)'} rounded-md p-2 primary-text`}
                            placeholder="Enter your height"
                            value={userDetails?.height || ''}
                            onChange={handleChange('height')}
                        />
                        {errors.height && <p className="text-red-500 text-xs mt-1">{errors.height}</p>}
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
                            value={userDetails?.fitnessLevel || ''}
                            onChange={handleChange('fitnessLevel')}
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
                            value={userDetails?.fitnessGoal || ''}
                            onChange={handleChange('fitnessGoal')}
                        >
                            <option value="">-- Select a goal --</option>
                            <option value="lose weight">Lose Weight</option>
                            <option value="build muscle">Build Muscle</option>
                            <option value="improve endurance">Improve Endurance</option>
                            <option value="general fitness">General Fitness</option>
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