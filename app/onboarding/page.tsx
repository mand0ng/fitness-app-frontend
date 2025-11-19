'use client';
import StepOne from "./components/step-one";
import StepThree from "./components/step-three";
import StepTwo from "./components/step-two";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, IUser } from "../models/user";

const OnboardingPage = () => {
    const progress = 1;
    const totalSteps = 3;
    const percent = (progress / totalSteps) * 100;
    const [currentStep, setCurrentStep] = useState(1);
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [userData, setUserData] = useState<User>(new User());
    const [localVarsSet, setLocalVarsSet] = useState(false);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);

    const gotoStep = (step: number) => {
        // Logic to navigate to the specified step
        setCurrentStep(step);

        // go to /dashboard if 4
        if (step === 4) {

            setGenerating(true);

            generate_30_day_plan();
            
            console.log(userData);
            // router.push("/dashboard");
            
        }
    }

    const generate_30_day_plan = async () => {
        try {
            const response = await fetch('http://localhost:8000/generate-30-day-plan/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },

                body: JSON.stringify({...userData, date_now: new Date().toISOString().split('T')[0]}),
            });

            const data = await response.json();
            if (response.ok) {
                console.log("ONBOARDING PAGE:: generate-30-day-plan/", data);
                if (data.status === "success" && !!data.plan_id) {
                    localStorage.setItem("plan_id", data.plan_id.toString());
                    router.push("/dashboard");
                }
            } else {
                console.error("Error generating 30-day plan:", data);
            }
        } catch (error) {
            console.error("Error generating 30-day plan:", error);
        }
    };

    const checkToken = async () => {
        const checkTokenApi = process.env.NEXT_PUBLIC_CHECK_TOKEN_API;
        if (!checkTokenApi) {
            console.error("CHECK_TOKEN_API is not defined");
            return;
        }
        try {
            const response = await fetch(checkTokenApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const data = await response.json();
            if (response.ok) {
                console.log("Token is valid:", data);
                
                if (data.status === "success") {
                    if (data.onboarding == "complete") {
                        console.log("onboarding complete");
                        router.push("/dashboard");
                    } else {
                        console.log("onboarding not complete");
                        // populate userData
                        const user = User.fromJSON(data.user);
                        setUserData(user);
                    }
                }
                setLoading(false);
            } else {
                router.push("/login");
            }
        } catch (error) {
            console.error("Error checking token:", error);
            router.push("/login");
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
        setLocalVarsSet(true);
    }, []);

    useEffect(() => {
        // setToken(localStorage.getItem("token"));
        // setLocalVarsSet(true);
        if (!localVarsSet) return;
        console.log("ONBOARDING PAGE:: checking token: " + token);
        if (token) {
            checkToken();
            console.log("Valid token, stay in onboarding");
        } else {
            router.push("/login");
            console.log("no token, go to login");
        }
    }, [token, localVarsSet]);

    const updateUserData = (field: keyof User, value: any) => {
        setUserData(
            (prevData) => {
                const updatedUserData = new User({ ...prevData, [field]: value });
                return updatedUserData;
            }
        );
    };
    
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="sub-text text-xl">Loading...</p>
            </div>
        );
    }

    return (
        <section className="flex items-center justify-center min-h-screen">
            {currentStep === 1 && <StepOne gotoStep={gotoStep} updateUserData={updateUserData} userData={userData}/>}
            {currentStep === 2 && <StepTwo gotoStep={gotoStep} updateUserData={updateUserData} userData={userData}/>}
            {currentStep === 3 && <StepThree gotoStep={gotoStep} updateUserData={updateUserData} userData={userData}/>}

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