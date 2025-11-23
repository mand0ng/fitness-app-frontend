"use client";

import { useEffect, useState } from "react";
import ProgressBar from "./progress-bar";
import { IUser } from '@/context/user-context';
import { isUserStepTwoCompleted } from '@/utils/utils';
import { getUserContext } from '@/context/user-context';

interface StepTwoProps {
    gotoStep: (step: number) => void;
    updateUserDetails: (field: keyof IUser, value: any) => void;
    userDetails: IUser | null;
}

const StepTwo = ({ gotoStep, updateUserDetails, userDetails }: StepTwoProps) => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const equipmentOptions = [
        { label: "Bodyweight", value: "bodyweight" },
        { label: "Dumbbells", value: "dumbells" },
        { label: "Resistance Bands", value: "resistance bands" },
        { label: "Kettlebells", value: "kettleballs" },
        { label: "Pull-up Bar", value: "pull-up bars" },
        { label: "Yoga Mat", value: "yoga mat" },
        { label: "Full Gym Access", value: "full gym access" }
    ];
    const [enableBtn, setEnableBtn] = useState(false);
    const [errors, setErrors] = useState<{ daysAvailability?: string; equipmentAvailability?: string }>({});
    const [workoutLocation, setWorkoutLocation] = useState(userDetails?.workoutLocation || '');
    const [daysAvailability, setDaysAvailability] = useState(userDetails?.daysAvailability || []);
    const [equipmentAvailability, setEquipmentAvailability] = useState(userDetails?.equipmentAvailability || []);
    const { saveUserDetails, setFromStepTwo } = getUserContext();

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Validate workout location
        const validLocations = ['home workout', 'gym workout', 'both home and gym'];
        if (validLocations.includes(value)) {
            // updateUserDetails('workoutLocation', value);
            setWorkoutLocation(value);
        }
    };

    const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let updatedDays = daysAvailability || [];
        if (e.target.checked) {
            updatedDays = [...updatedDays, value];
        } else {
            updatedDays = updatedDays.filter(day => day !== value);
        }

        // Validate: must have at least 3 days
        if (updatedDays.length < 3 && updatedDays.length > 0) {
            setErrors(prev => ({ ...prev, daysAvailability: 'Please select at least 3 days' }));
        } else {
            setErrors(prev => ({ ...prev, daysAvailability: undefined }));
        }

        // updateUserDetails('daysAvailability', updatedDays);
        setDaysAvailability(updatedDays);
    }

    const handleEquipmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let updatedEquipment = equipmentAvailability || [];
        if (e.target.checked) {
            updatedEquipment = [...updatedEquipment, value];
        } else {
            updatedEquipment = updatedEquipment.filter
                (equipment => equipment !== value);
        }

        // Validate: must have at least 1 equipment
        if (updatedEquipment.length === 0) {
            setErrors(prev => ({ ...prev, equipmentAvailability: 'Please select at least one equipment option' }));
        } else {
            setErrors(prev => ({ ...prev, equipmentAvailability: undefined }));
        }

        // updateUserDetails('equipmentAvailability', updatedEquipment);
        setEquipmentAvailability(updatedEquipment);
    };

    const validateForm = () => {
        if (!errors.daysAvailability &&
            !errors.equipmentAvailability &&
            workoutLocation &&
            daysAvailability.length >= 3 &&
            equipmentAvailability.length >= 1
        ) {
            setEnableBtn(true);
            return true;
        } else {
            setEnableBtn(false);
            return false;
        }
    };

    const handleSubmit = () => {
        if (validateForm()) {
            saveUserDetails("workoutLocation", workoutLocation);
            saveUserDetails("daysAvailability", daysAvailability);
            saveUserDetails("equipmentAvailability", equipmentAvailability);
            gotoStep && gotoStep(3);
        }
    };

    const handleBack = () => {
        setFromStepTwo(true);
        gotoStep && gotoStep(1);
    };

    useEffect(() => {
        validateForm();
    }, [workoutLocation, daysAvailability, equipmentAvailability]);


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
                                <input type="radio" name="workout-location" value="home workout" checked={workoutLocation === 'home workout'} onChange={handleLocationChange} />
                                Home Workouts
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="workout-location" value="gym workout" checked={workoutLocation === 'gym workout'} onChange={handleLocationChange} />
                                Gym Workouts
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="workout-location" value="both home and gym" checked={workoutLocation === 'both home and gym'} onChange={handleLocationChange} />
                                Both Home and Gym
                            </label>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h1 className="text-lg font-bold">Days & Time Availability</h1>
                    <div className="mt-2">

                        <p className="sub-text mt-2">
                            When can you commit to workout? <br />
                            <span className="sub-text text-xs italic">(Select at least 3 days)</span>
                        </p>

                        <div className="mt-2 grid grid-cols-4 gap-3 justify-center">
                            {daysOfWeek.map(day => (
                                <label key={day} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="availability"
                                        value={day.toLowerCase()}
                                        checked={daysAvailability?.includes(day.toLowerCase()) ?? false}
                                        onChange={handleAvailabilityChange}
                                    />
                                    {day}s
                                </label>
                            ))}
                        </div>
                        {errors.daysAvailability && <p className="text-red-500 text-xs mt-2">{errors.daysAvailability}</p>}

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
                            {equipmentOptions.map(option => (
                                <label key={option.value} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="equipment"
                                        value={option.value}
                                        checked={equipmentAvailability?.includes(option.value) ?? false}
                                        onChange={handleEquipmentChange}
                                    />
                                    {option.label}
                                </label>
                            ))}

                        </div>
                        {errors.equipmentAvailability && <p className="text-red-500 text-xs mt-2">{errors.equipmentAvailability}</p>}
                    </div>
                </div>

                <div className="mt-10 flex justify-between items-center">
                    <button onClick={() => handleBack()} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md text-sm">
                        Back
                    </button>
                    <button disabled={!enableBtn} onClick={() => handleSubmit()} className={` ${enableBtn ? "bg-blue-500" : "bg-blue-300"} px-4 py-2 text-white rounded-md text-sm`}>
                        Next
                    </button>
                </div>

            </div>
        </div>

    );
};

export default StepTwo;

