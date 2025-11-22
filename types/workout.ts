// Workout types based on backend response structure

export interface Exercise {
    name: string;
    sets: number;
    reps: string;
    rest: string;
    estimated_weight: string;
    notes?: string;
}

export interface WarmUpCoolDown {
    name: string;
    duration: string;
}

export interface WorkoutDetails {
    focus: string;
    warm_up: WarmUpCoolDown[];
    exercises: Exercise[];
    cooldown: WarmUpCoolDown[];
    estimated_duration: string;
}

export interface WorkoutDay {
    day: number;
    date: string;
    type: 'workout' | 'rest';
    workout?: WorkoutDetails;
}

export interface WorkoutProgram {
    id: number;
    user_id: number;
    start_date: string;
    total_days: number;
    notes_from_coach: string;
    plan: WorkoutDay[];
}

export interface WorkoutResponse {
    status: 'success' | 'error';
    workout?: WorkoutProgram;
    message?: string;
}

export interface JobStatusResponse {
    status: 'processing' | 'completed' | 'failed' | 'not_found';
    error?: string;
    workout_plan?: string;
}

export interface CreateWorkoutResponse {
    status: 'success' | 'error';
    job_id?: string;
    message?: string;
}
