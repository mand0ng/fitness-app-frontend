"use client";

import { useEffect, useState } from "react";
import ProgressBar from "./progress-bar";
import { User, IUser } from "../../models/user";

interface StepTwoProps {
    gotoStep?: (step: number) => void;
    updateUserData?: (field: keyof User, value: any) => void;
    userData?: User;
}

const StepTwo = ({gotoStep, updateUserData, userData }: StepTwoProps) => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const equipmentOptions = [
        { label: "Bodyweight", value: "bodyweight" },
        { label: "Dumbbells", value: "dumbbells" },
        { label: "Resistance Bands", value: "resistance_bands" },
        { label: "Kettlebells", value: "kettlebells" },
        { label: "Pull-up Bar", value: "pull_up_bar" },
        { label: "Yoga Mat", value: "yoga_mat" },
        { label: "Full Gym Access", value: "full_gym_access" }
    ];
    const [enableBtn, setEnableBtn] = useState(false);

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (updateUserData) {
            updateUserData('work_out_location', e.target.value);
        }
    };

    const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (updateUserData) {
            const value = e.target.value;
            let updatedDays = userData?.days_availability || [];
            if (e.target.checked) {
                updatedDays = [...updatedDays, value];
            } else {
                updatedDays = updatedDays.filter(day => day !== value);
            }
            updateUserData('days_availability', updatedDays);
        }
    };

    const handleEquipmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (updateUserData) {
            const value = e.target.value;
            let updatedEquipment = userData?.equipment_availability || [];
            if (e.target.checked) {
                updatedEquipment = [...updatedEquipment, value];
            } else {
                updatedEquipment = updatedEquipment.filter
                    (equipment => equipment !== value);
            }
            updateUserData('equipment_availability', updatedEquipment);
        }
    };

    const validateForm = () => {
        if (userData?.stepTwoCompleted()) {
            setEnableBtn(true);
        } else {
            setEnableBtn(false);
        }
    };

    useEffect(() => {
        validateForm();
    }, [userData]);


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
                                <input type="radio" name="workout-location" value="home_workout" checked={userData?.work_out_location === 'home_workout'} onChange={handleLocationChange} />
                                Home Workouts
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="workout-location" value="gym_workout" checked={userData?.work_out_location === 'gym_workout'} onChange={handleLocationChange} />
                                Gym Workouts
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="workout-location" value="both" checked={userData?.work_out_location === 'both'} onChange={handleLocationChange} />
                                Both Home and Gym
                            </label>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h1 className="text-lg font-bold">Days & Time Availability</h1>
                    <div className="mt-2">
                        
                        <p className="sub-text mt-2">
                            When can you commit to workout? <br/>
                            <span className="sub-text text-xs italic">(Select at least 3 days)</span>
                        </p>

                        <div className="mt-2 grid grid-cols-4 gap-3 justify-center">
                            {daysOfWeek.map(day => (
                                <label key={day} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="availability"
                                        value={day.toLowerCase()}
                                        checked={userData?.days_availability.includes(day.toLowerCase())}
                                        onChange={handleAvailabilityChange}
                                    />
                                    {day}s
                                </label>
                            ))}
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
                            {equipmentOptions.map(option => (
                                <label key={option.value} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="equipment"
                                        value={option.value}
                                        checked={userData?.equipment_availability.includes(option.value)}
                                        onChange={handleEquipmentChange}
                                    />
                                    {option.label}
                                </label>
                            ))}
                            
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex justify-between items-center">
                    <button onClick={() => gotoStep && gotoStep(1)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md text-sm">
                        Back
                    </button>
                    <button disabled={!enableBtn} onClick={() => gotoStep && gotoStep(3)} className={` ${enableBtn ? "bg-blue-500" : "bg-blue-300"} px-4 py-2 text-white rounded-md text-sm`}>
                        Next
                    </button>
                </div>

            </div>
        </div>

    );
};

export default StepTwo;

