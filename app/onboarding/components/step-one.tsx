"use client";
import { useEffect, useState } from 'react';
import ProgressBar from './progress-bar';
import { IUser } from '@/context/user-context';
import { isUserStepOneCompleted } from '@/utils/utils';
import { getUserContext } from '@/context/user-context';

interface StepOneProps {
    gotoStep: (step: number) => void;
    updateUserDetails: (field: keyof IUser, value: any) => void;
    saveUserDetails: (field: keyof IUser, value: any) => void;
    userDetails: IUser | null;
}

const StepOne = ({ gotoStep, updateUserDetails, saveUserDetails, userDetails }: StepOneProps) => {
    const [enableBtn, setEnableBtn] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof IUser, string>>>({});
    const [age, setAge] = useState(userDetails?.age || '');
    const [weight, setWeight] = useState(userDetails?.weight || '');
    const [height, setHeight] = useState(userDetails?.height || '');
    const [gender, setGender] = useState(userDetails?.gender || '');
    const [fitnessLevel, setFitnessLevel] = useState(userDetails?.fitnessLevel || '');
    const [fitnessGoal, setFitnessGoal] = useState(userDetails?.fitnessGoal || '');
    const { isFetchingUser, isFromStepTwo, setFromStepTwo } = getUserContext();

    const handleSubmit = () => {
        console.log("handleSubmit")

        console.log(age, weight, height, gender, fitnessLevel, fitnessGoal)
        console.log(errors)
        console.log(isUserStepOneCompleted(userDetails || null))

        if (!age ||
            !weight ||
            !height ||
            !gender ||
            !fitnessLevel ||
            !fitnessGoal ||
            Object.values(errors).some(error => error)
        ) {
            return;
        }

        saveUserDetails('age', age);
        saveUserDetails('weight', weight);
        saveUserDetails('height', height);
        saveUserDetails('gender', gender);
        saveUserDetails('fitnessLevel', fitnessLevel);
        saveUserDetails('fitnessGoal', fitnessGoal);

        gotoStep(2);
    };

    const enableNextStepButton = () => {
        if (age !== '' &&
            weight !== '' &&
            height !== '' &&
            gender !== '' &&
            fitnessLevel !== '' &&
            fitnessGoal !== '' &&
            Object.values(errors).every(error => !error)
        ) {
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

        if (field === 'age') {
            setAge(value);
        } else if (field === 'weight') {
            // if value has decimal
            if (value.includes('.')) {
                const weight = parseFloat(value).toFixed(1);
                setWeight(weight);
            } else {
                setWeight(value);
            }
        } else if (field === 'height') {
            // if value has decimal
            if (value.includes('.')) {
                const height = parseInt(value);
                setHeight(height);
            } else {
                setHeight(value);
            }
        } else if (field === 'gender') {
            setGender(value);
        } else if (field === 'fitnessLevel') {
            setFitnessLevel(value);
        } else if (field === 'fitnessGoal') {
            setFitnessGoal(value);
        }

        // Validate the field
        const error = validateField(field, value);

        // Update errors state
        setErrors(prev => ({
            ...prev,
            [field]: error || undefined
        }));
    };

    const handleBlur = (field: keyof IUser) => (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.value;

        // Format and update local state for specific fields
        if (field === 'weight') {
            if (value === '') {
                setWeight('');
            } else {
                const weight = parseFloat(value).toFixed(1);
                setWeight(weight);
            }
        } else if (field === 'height') {
            if (value === '') {
                setHeight('');
            } else {
                const height = parseInt(value);
                setHeight(height);
            }
        }
    };

    const setUserDetailsToPage = (user: IUser | null) => {
        if (user) {
            setAge(user.age?.toString() || '');
            setWeight(user.weight?.toString() || '');
            setHeight(user.height?.toString() || '');
            setGender(user.gender || '');
            setFitnessLevel(user.fitnessLevel || '');
            setFitnessGoal(user.fitnessGoal || '');
        }
    };

    useEffect(() => {
        enableNextStepButton();
    }, [age, weight, height, gender, fitnessLevel, fitnessGoal, errors]);

    useEffect(() => {
        setUserDetailsToPage(userDetails);
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
                            value={age}
                            onChange={(e) => handleChange('age')(e)}
                            min="1"
                            max="100"
                            step="1"
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
                            value={gender}
                            onChange={(e) => handleChange('gender')(e)}
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
                            value={weight}
                            onChange={(e) => handleChange('weight')(e)}
                            min="1"
                            max="1000"
                            onBlur={handleBlur('weight')}
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
                            value={height}
                            onChange={(e) => handleChange('height')(e)}
                            min="100"
                            max="300"
                            onBlur={handleBlur('height')}
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
                            value={fitnessLevel}
                            onChange={(e) => handleChange('fitnessLevel')(e)}
                        >
                            <option value="">-- Select a level --</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advance">Advance</option>
                        </select>
                        <div className="mt-2 text-xs sub-text">
                            <p><span className="font-bold">Beginner:</span> Less than 6 months of experience. You are learning proper form and building a routine.</p>
                            <p className="mt-1"><span className="font-bold">Intermediate:</span> 6 months to 2 years of consistent training. You are comfortable with main lifts (Squat, Bench, Deadlift) and want to increase strength/muscle.</p>
                            <p className="mt-1"><span className="font-bold">Advanced:</span> 2+ years of consistent training. You have specific performance goals and require high volume or specialized techniques to progress.</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="goals">
                            Select Your Primary Fitness Goal
                        </label>
                        <select
                            id="goals"
                            className="w-full border border-(--muted) rounded-md p-2 primary-text"
                            value={fitnessGoal}
                            onChange={(e) => handleChange('fitnessGoal')(e)}
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
                    <button disabled={!enableBtn} onClick={() => handleSubmit()} className={`w-8/10 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md ${enableBtn ? '' : 'opacity-50 cursor-not-allowed'}`}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};
export default StepOne;