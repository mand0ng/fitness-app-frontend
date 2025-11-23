import { IUser } from "../context/user-context";

export const userToJson = (user: IUser): string => {
    return JSON.stringify(user);
};

export const userFromJson = (json: string): IUser => {
    return JSON.parse(json);
};

export const isUserDoneOnboarding = (user: IUser | null): boolean => {
    if (!user) {
        return false;
    }
    if (!!user &&
        !!user.age &&
        !!user.height &&
        !!user.weight &&
        !!user.fitnessLevel &&
        !!user.fitnessGoal &&
        !!user.workoutLocation &&
        !!user.daysAvailability &&

        !!user.equipmentAvailability

        // !!user.equipmentAvailability &&
        // !!user.notes
    ) {
        return true;
    }
    return false;
};

export const isUserStepOneCompleted = (user: IUser | null): boolean => {
    if (!user) {
        return false;
    }
    if (!!user &&
        !!user.age &&
        !!user.height &&
        !!user.weight &&
        !!user.fitnessLevel &&
        !!user.fitnessGoal
    ) {
        return true;
    }
    return false;
};

export const isUserStepTwoCompleted = (user: IUser | null): boolean => {
    if (!user) {
        return false;
    }
    if (!!user &&
        !!user.workoutLocation &&
        !!user.daysAvailability &&
        !!user.equipmentAvailability
    ) {
        return true;
    }
    return false;
};

export const isUserStepThreeCompleted = (user: IUser | null): boolean => {
    if (!user) {
        return false;
    }
    if (!!user &&
        !!user.notes
    ) {
        return true;
    }
    return false;
};

export const capitalizeFirstLetter = (str: string) => {
    if (!str) return '';

    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const replaceUnderScoreWithSpace = (str: string) => {
    if (!str) return '';
    // replace under score and capitalize first letter of each word
    return str.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

export const capitalizeFirstLetterArray = (arr: string[]) => {
    if (!arr) return [];
    const newArr: string[] = [];
    for (let i = 0; i < arr.length; i++) {
        newArr.push(capitalizeFirstLetter(arr[i]));
    }
    return newArr;
}
