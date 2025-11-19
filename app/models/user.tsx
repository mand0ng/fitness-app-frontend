'use client';
export interface IUser {
    id: number;
    email: string;
    name: string;
    age: number;
    height: number;
    weight: number;
    fitness_level: string;
    fitness_goal: string;
    work_out_location: string;
    days_availability: string[];
    equipment_availability: string[];
    notes: string;   
}

export class User implements IUser {
    id: number;
    email: string;
    name: string;
    age: number;
    height: number;
    weight: number;
    fitness_level: string;
    fitness_goal: string;
    work_out_location: string;
    days_availability: string[];
    equipment_availability: string[];
    notes: string;

    constructor(data?: Partial<IUser>) {
        this.id = data?.id ?? 0;
        this.email = data?.email ?? "";
        this.name = data?.name ?? "";
        this.age = data?.age ?? 0;
        this.height = data?.height ?? 0;
        this.weight = data?.weight ?? 0;
        this.fitness_level = data?.fitness_level ?? "";
        this.fitness_goal = data?.fitness_goal ?? "";
        this.work_out_location = data?.work_out_location ?? "";
        this.days_availability = data?.days_availability ?? [];
        this.equipment_availability = data?.equipment_availability ?? [];
        this.notes = data?.notes ?? "";
    }

    static from(obj: Partial<IUser>): User {
        return new User({
            email: obj.email ?? '',
            name: obj.name ?? '',
            age: obj.age ?? 0,
            height: obj.height ?? 0,
            weight: obj.weight ?? 0,
            fitness_level: obj.fitness_level ?? '',
            fitness_goal: obj.fitness_goal ?? '',
            work_out_location: obj.work_out_location ?? '',
            days_availability: obj.days_availability ?? [],
            equipment_availability: obj.equipment_availability ?? [],
            notes: obj.notes ?? '',
        });
    }

    toJSON(): IUser {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            age: this.age,
            height: this.height,
            weight: this.weight,
            fitness_level: this.fitness_level,
            fitness_goal: this.fitness_goal,
            work_out_location: this.work_out_location,
            days_availability: this.days_availability,
            equipment_availability: this.equipment_availability,
            notes: this.notes,
        };
    }

    static fromJSON(json: IUser): User {
        return new User({
            id: json.id,
            email: json.email,
            name: json.name,
            age: json.age,
            height: json.height,
            weight: json.weight,
            fitness_level: json.fitness_level,
            fitness_goal: json.fitness_goal,
            work_out_location: json.work_out_location,
            days_availability: json.days_availability,
            equipment_availability: json.equipment_availability,
            notes: json.notes,
        });
    }

    stepOneCompleted(): boolean {
        return (
            this.age > 0 &&
            this.weight > 0 &&
            this.height > 0 &&
            this.fitness_level !== "" &&
            this.fitness_goal !== ""
        );
    }

    stepTwoCompleted(): boolean {
        return (
            this.work_out_location !== "" &&
            this.days_availability.length >= 3 &&
            this.equipment_availability.length > 0
        );
    }

    stepThreeCompleted(): boolean {
        return this.notes !== "";
    }

    userValid(): boolean {
        return this.stepOneCompleted() && this.stepTwoCompleted() && this.stepThreeCompleted();
    }

}