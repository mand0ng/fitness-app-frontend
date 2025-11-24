"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { workoutService } from "@/services/workout-service";
import { WorkoutProgram, JobStatusResponse } from "@/types/workout";
import { useUser } from "./user-context";

interface IWorkoutContextType {
    workoutProgram: WorkoutProgram | null;
    isLoading: boolean;
    isGenerating: boolean;
    error: string | null;
    fetchUserWorkout: () => Promise<void>;
    generateWorkout: () => Promise<void>;
    hasActiveWorkout: () => boolean;
}

const WorkoutContext = createContext<IWorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
    const { user, getToken } = useUser();
    const [workoutProgram, setWorkoutProgram] = useState<WorkoutProgram | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Automatically fetch workout when user is logged in
    useEffect(() => {
        if (user) {
            fetchUserWorkout();
        } else {
            setWorkoutProgram(null);
        }
    }, [user]);

    const fetchUserWorkout = async () => {
        if (!user) return;

        const token = getToken();
        if (!token) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await workoutService.getUserWorkout(token, user.id);
            if (response.status === "success" && response.workout) {
                setWorkoutProgram(response.workout);
            } else {
                // It's okay if they don't have a workout yet
                setWorkoutProgram(null);
            }
        } catch (err: any) {
            console.error("Error fetching workout:", err);
            // Don't set global error here to avoid blocking UI for non-critical failures
            // or if the user just doesn't have a workout yet
        } finally {
            setIsLoading(false);
        }
    };

    const generateWorkout = async () => {
        if (!user) return;
        const token = getToken();
        if (!token) return;

        setIsGenerating(true);
        setError(null);

        try {
            // 1. Initiate creation
            const createResponse = await workoutService.createUserWorkout(token, user.id);

            if (createResponse.status === "success" && createResponse.job_id) {
                // 2. Poll for completion
                await workoutService.pollJobStatus(
                    token,
                    createResponse.job_id,
                    (status: JobStatusResponse) => {
                        console.log("Workout generation status:", status.job_status.status);
                    }
                );

                // 3. Fetch the newly created workout
                await fetchUserWorkout();
            } else {
                throw new Error(createResponse.message || "Failed to start workout generation");
            }
        } catch (err: any) {
            console.error("Error generating workout:", err);
            setError(err.message || "Failed to generate workout");
        } finally {
            setIsGenerating(false);
        }
    };

    const hasActiveWorkout = () => {
        return !!workoutProgram;
    };

    return (
        <WorkoutContext.Provider
            value={{
                workoutProgram,
                isLoading,
                isGenerating,
                error,
                fetchUserWorkout,
                generateWorkout,
                hasActiveWorkout
            }}
        >
            {children}
        </WorkoutContext.Provider>
    );
};

export const useWorkout = () => {
    const context = useContext(WorkoutContext);
    if (context === undefined) {
        throw new Error("useWorkout must be used within a WorkoutProvider");
    }
    return context;
};
