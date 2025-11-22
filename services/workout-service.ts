import Cookies from "js-cookie";
import { WorkoutResponse, CreateWorkoutResponse, JobStatusResponse } from '@/types/workout';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const workoutService = {
    getUserWorkOut: async (userID: string) => {
        if (!API_URL) throw new Error('API_URL is not defined');

        const response = await fetch(`${API_URL}/workout/get-user-workout/${userID}/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get('token')}`
            }
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Failed loding workout.");

        return data;
    },

    getUserWorkout: async (token: string): Promise<WorkoutResponse> => {
        const response = await fetch(`${API_URL}/workout/get-user-workout/1/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: '',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch workout');
        }

        return response.json();
    },

    createUserWorkout: async (token: string): Promise<CreateWorkoutResponse> => {
        const response = await fetch(`${API_URL}/workout/create-user-workout/1/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: '',
        });

        if (!response.ok) {
            throw new Error('Failed to create workout');
        }

        return response.json();
    },

    getJobStatus: async (token: string, jobId: string): Promise<JobStatusResponse> => {
        const response = await fetch(`${API_URL}/workout/job-status/${jobId}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get job status');
        }

        return response.json();
    },

    // Poll job status until completion or failure
    pollJobStatus: async (
        token: string,
        jobId: string,
        onProgress?: (status: JobStatusResponse) => void,
        intervalMs: number = 3000
    ): Promise<JobStatusResponse> => {
        return new Promise((resolve, reject) => {
            const interval = setInterval(async () => {
                try {
                    const status = await workoutService.getJobStatus(token, jobId);

                    if (onProgress) {
                        onProgress(status);
                    }

                    if (status.status === 'completed' || status.status === 'failed') {
                        clearInterval(interval);
                        resolve(status);
                    }
                } catch (error) {
                    clearInterval(interval);
                    reject(error);
                }
            }, intervalMs);
        });
    }
};
