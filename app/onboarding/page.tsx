'use client';
import StepOne from "./components/step-one";
import StepThree from "./components/step-three";
import StepTwo from "./components/step-two";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user-context";
import { isUserDoneOnboarding } from "@/utils/utils";
import Loading from "../components/loading";
import { useWorkout } from "@/context/workout-context";

const OnboardingPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const { user, isFetchingUser, updateUserDetails, saveUserDetails } = useUser();
    const { hasActiveWorkout, isLoading: isLoadingWorkout } = useWorkout();

    const gotoStep = (step: number) => {
        setCurrentStep(step);
        // step 1 weight, height, age, fitness level, goal
        // step 2 workout location, days availability, equipment availability
        // step 3 notes 
        // step 4 review
        // step 5 finish

        // if 1, 2 ,3 steps are done, go to /dashboard
        console.log("ONBOARDING:: step: ", step)
        if (step === 5) {
            setGenerating(true);
            router.push("/dashboard");
        }
    }

    useEffect(() => {
        if (isFetchingUser) return;
        if (isLoadingWorkout) return;

        if (user) {
            if (isUserDoneOnboarding(user) && hasActiveWorkout()) {
                router.push("/dashboard");
            } else {
                setLoading(false);
            }
        } else {
            router.push("/login");
        }
    }, [isFetchingUser, isLoadingWorkout, router, user]);

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <section className="flex items-center justify-center min-h-screen">

            {currentStep === 1 && <StepOne gotoStep={gotoStep} updateUserDetails={updateUserDetails} saveUserDetails={saveUserDetails} userDetails={user} />}
            {currentStep === 2 && <StepTwo gotoStep={gotoStep} updateUserDetails={updateUserDetails} userDetails={user} />}
            {currentStep === 3 && <StepThree gotoStep={gotoStep} updateUserDetails={updateUserDetails} userDetails={user} />}

            {generating && (
                <div className="flex flex-col items-center">
                    <p className="sub-text text-xl">Generating your personalized plan...</p>
                    <div className="loader mt-4"></div>
                </div>
            )}

        </section>
    );
};

export default OnboardingPage;