"use client";
import ProgressBar from "./progress-bar";
import { useEffect, useState } from "react";
import { IUser } from "@/context/user-context";
import { isUserStepThreeCompleted } from "@/utils/utils";
import Review from "./review";
import { useUser } from "@/context/user-context";

interface StepThreeProps {
    gotoStep: (step: number) => void;
    updateUserDetails: (field: keyof IUser, value: any) => void;
    userDetails: IUser | null;
}

const StepThree = ({ gotoStep, updateUserDetails, userDetails }: StepThreeProps) => {
    const [enableBtn, setEnableBtn] = useState(true);
    const [review, setReview] = useState(false);
    const [notes, setNotes] = useState(userDetails?.notes || '');
    const [notesError, setNotesError] = useState<string | null>(null);
    const MAX_NOTES_LENGTH = 100;
    const { saveUserDetails } = useUser();


    const textareaChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;

        // Validate notes length
        if (value.length > MAX_NOTES_LENGTH) {
            setNotesError(`Notes must be ${MAX_NOTES_LENGTH} characters or less (currently ${value.length})`);
        } else {
            setNotesError(null);
        }

        setNotes(value);
        saveUserDetails('notes', value);
    };

    const validateForm = () => {
        if (notes.length > 0) {
            // setEnableBtn(true);
            return true;
        } else {
            // setEnableBtn(false);
            return false;
        }
    }

    const onSubmit = async () => {
        // Final validation before submit
        if (notes.length > MAX_NOTES_LENGTH) {
            setNotesError(`Notes must be ${MAX_NOTES_LENGTH} characters or less`);
            return;
        }
        setNotes(notes);
        setReview(true);
    };

    const onReviewSubmit = async () => {
        if (saveUserDetails) {
            if (validateForm()) {
                await saveUserDetails('notes', notes);
            }
            gotoStep(5);
        }
    };


    return (
        <div className="">

            {review && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-(--card-background) p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
                        <Review userDetails={userDetails ? { ...userDetails, notes } : null} gotoStep={gotoStep} onReviewSubmit={onReviewSubmit} />
                        <button
                            onClick={() => setReview(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            <div className="border border-(--muted) rounded-lg shadow-lg p-10 my-secondary-bg">
                {/* {!review && ( */}
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
                                className={`w-full border ${notesError ? 'border-red-500' : 'border-(--muted)'} rounded-md p-2 primary-text`}
                                rows={4}
                                placeholder="e.g., knee pain, shoulder injury, back issues, limited mobility..."
                                value={notes}
                                onChange={textareaChangeHandler}
                                maxLength={MAX_NOTES_LENGTH}
                            />
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-gray-500">{notes.length}/{MAX_NOTES_LENGTH} characters</span>
                                {notesError && <p className="text-red-500 text-xs">{notesError}</p>}
                            </div>
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
                        <button disabled={!enableBtn} onClick={() => onSubmit()} className={`mt-8 w-full ${enableBtn ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-300"} text-white py-3 rounded-md  transition-colors`}>
                            Generate My 30-Day Plan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepThree;