'use client';
import StepOne from "./components/step-one";
import StepThree from "./components/step-three";
import StepTwo from "./components/step-two";
import { useState } from "react";
import { useRouter } from "next/navigation";

const OnboardingPage = () => {
    const progress = 1;
    const totalSteps = 3;
    const percent = (progress / totalSteps) * 100;
    const [currentStep, setCurrentStep] = useState(1);
    const router = useRouter();

    const gotoStep = (step: number) => {
        // Logic to navigate to the specified step
        setCurrentStep(step);

        // go to /dashboard if 4
        if (step === 4) {
            router.push("/dashboard");
        }
    }


    return (
        <section className="flex items-center justify-center min-h-screen">
            <StepOne visible={currentStep === 1} gotoStep={gotoStep} />

            <StepTwo visible={currentStep === 2} gotoStep={gotoStep} />

            <StepThree visible={currentStep === 3} gotoStep={gotoStep} />
        </section>
    );
};

export default OnboardingPage;