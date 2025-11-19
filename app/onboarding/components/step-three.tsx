"use client";
import ProgressBar from "./progress-bar";
import { IUser, User } from "../../models/user";
import { useEffect, useState } from "react";


interface StepThreeProps {
    gotoStep?: (step: number) => void;
    updateUserData?: (field: keyof IUser, value: any) => void;
    userData?: User;
}

const StepThree = ({gotoStep, updateUserData, userData }: StepThreeProps) => {
    const [enableBtn, setEnableBtn] = useState(false);

    const handleChange = (field: keyof IUser) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (updateUserData) {
            updateUserData(field, e.target.value);
        }
    };

    const validateForm = () => {
        if (userData?.stepThreeCompleted()) {
            setEnableBtn(true);
        } else {
            setEnableBtn(false);
        }
    }

    useEffect(() => {
        validateForm();
    }, [userData]);

    return (
        <div className="border border-(--muted) rounded-lg shadow-lg p-10 my-secondary-bg">
            <div>
                <div>
                    <h1 className="text-2xl font-bold text-center">
                        Final Step: Health & Safety
                    </h1>
                    <p className="text-center sub-text mt-2">
                        Just a few more details to ensure your plan is perfectly safe and effective!
                    </p>
                </div>

                <div className="mt-4">
                    <ProgressBar progress={2.8} totalSteps={3} />
                </div>


                <div>
                    <span>
                        Injuries or Limitations
                    </span>

                    <div className="mt-2">
                        <textarea
                            className="w-full border border-(--muted) rounded-md p-2 primary-text"
                            rows={4}
                            placeholder="e.g., knee pain, shoulder injury, back issues, limited mobility..."
                            value={userData?.notes || ''}
                            onChange={handleChange('notes')}
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <div className="mt-2 flex items-starts gap-2">
                        <div className="flex flex-row mt-1 gap-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-gray-500"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <text
                                    x="12"
                                    y="16"
                                    textAnchor="middle"
                                    fontSize="9"
                                    fontFamily="Arial, Helvetica, sans-serif"
                                    fill="currentColor"
                                >
                                    i
                                </text>
                            </svg>
                        </div>

                        <p className="text-sm sub-text max-w-md">
                            Disclaimer: Providing accurate information about your health is crucial for creating a safe and effective fitness plan. Consult with a healthcare professional before starting any new fitness program, especially if you have pre-existing conditions.
                        </p>
                    </div>
                </div>

                <div>
                    {/* Generate My 30-Day Plan */}
                    <button disabled={!enableBtn} onClick={() => gotoStep && gotoStep(4)} className={`mt-8 w-full ${enableBtn ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-300"} text-white py-3 rounded-md  transition-colors`}>
                        Generate My 30-Day Plan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StepThree;