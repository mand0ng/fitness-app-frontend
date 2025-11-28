'use client';
import Header from "../components/header";
import Footer from "../components/footer";
import UserDetails from "./components/user-details";
import MyCalendar from "./components/my-calendar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserContext } from "@/context/user-context";
import { isUserDoneOnboarding } from "@/utils/utils";
import { workoutService } from "@/services/workout-service";
import { WorkoutProgram } from "@/types/workout";

const Dashboard = () => {
    const router = useRouter();
    const { user, removeToken, isFetchingUser, userIsLoggedIn, getToken } = getUserContext();
    const [loading, setLoading] = useState(true);
    const [workoutData, setWorkoutData] = useState<WorkoutProgram | null>(null);
    const [generatingWorkout, setGeneratingWorkout] = useState(false);
    const [generationProgress, setGenerationProgress] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isFetchingUser) return;

        if (!user || !userIsLoggedIn) {
            removeToken();
            router.push("/login");
            return;
        }

        if (user && !isUserDoneOnboarding(user)) {
            router.push("/onboarding");
            return;
        }

        // Fetch workout data
        fetchWorkoutData();
    }, [user, router, isFetchingUser, userIsLoggedIn]);

    const fetchWorkoutData = async () => {
        const token = getToken();
        if (!token) return;

        try {
            setLoading(true);
            setError(null);

            const response = await workoutService.getUserWorkout(token, user?.id || '');

            if (response.status === 'success' && response.workout) {
                setWorkoutData(response.workout);
                setLoading(false);
            } else {
                // No workout found, trigger generation
                await handleWorkoutGeneration();
            }
        } catch (err) {
            console.error('Error fetching workout:', err);
            // Try to generate workout if fetch fails
            await handleWorkoutGeneration();
        }
    };

    const handleWorkoutGeneration = async () => {
        const token = getToken();
        if (!token) return;

        try {
            setGeneratingWorkout(true);
            setGenerationProgress('Starting workout generation...');

            const createResponse = await workoutService.createUserWorkout(token, user?.id || '');

            if (createResponse.status === 'error') {
                setError(createResponse.message || 'Failed to create workout');
                setGeneratingWorkout(false);
                setLoading(false);
                return;
            }

            if (!createResponse.job_id) {
                setError('No job ID returned');
                setGeneratingWorkout(false);
                setLoading(false);
                return;
            }

            // Poll job status
            setGenerationProgress('Generating your personalized workout plan... This may take 3-5 minutes.');

            const jobResult = await workoutService.pollJobStatus(
                token,
                createResponse.job_id,
                (data) => {
                    console.log("job status", data);
                    if (data.job_status.status === 'processing') {
                        setGenerationProgress('Still generating. Please wait...');
                    }
                }
            );
            console.log(jobResult);

            if (jobResult.job_status.status === 'failed') {
                // setError(jobResult.job_status.error || 'Workout generation failed');
                console.log(jobResult.job_status.error);
                setError("Failed to generate or load workout. Please try to refresh the page.")
                setGeneratingWorkout(false);
                setLoading(false);
                return;
            }

            // Fetch the completed workout
            setGenerationProgress('Workout generated! Loading your plan...');
            await fetchWorkoutData();
            setGeneratingWorkout(false);
        } catch (err) {
            console.error('Error generating workout:', err);
            setError('Failed to generate workout. Please try again.');
            setGeneratingWorkout(false);
            setLoading(false);
        }
    };

    if (loading || generatingWorkout) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="sub-text text-xl mb-2">
                        {generatingWorkout ? 'Generating Workout...' : 'Loading...'}
                    </p>
                    {generationProgress && (
                        <p className="text-sm text-muted-foreground max-w-md">
                            {generationProgress}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background">
                <div className="text-center max-w-md">
                    <p className="text-xl text-red-500 mb-4">{error}</p>
                    <button
                        onClick={() => {
                            setError(null);
                            fetchWorkoutData();
                        }}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                    >
                        Refresh Page
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section>
            <Header />
            <section className="m-5 md:m-20">
                <div className="border border-(--muted) rounded-lg shadow-lg p-3 md:p-10 my-secondary-bg mb-10">
                    <h1 className="text-xl md:text-2xl font-bold mb-2">Welcome back {user?.name || 'Jane Doe'}!</h1>
                </div>

                {user && <UserDetails user={user} />}
                <MyCalendar workoutData={workoutData} />
            </section>
            <Footer />
        </section>
    );
};

export default Dashboard;