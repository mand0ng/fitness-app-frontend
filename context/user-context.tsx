"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService } from "@/services/auth-service";
import Cookies from 'js-cookie';
import { userService } from "@/services/user-service";
import { workoutService } from "@/services/workout-service";

export interface ICandidate {
    email: string;
    name: string;
    password: string;
}

export interface ILoginCandidate {
    email: string;
    password: string;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    gender: string;
    age?: number;
    height?: number;
    weight?: number;
    fitnessLevel?: string;
    fitnessGoal?: string;
    workoutLocation?: string;
    daysAvailability?: string[];
    equipmentAvailability?: string[];
    notes?: string;
    // token?: string;
    // isDoneOnboarding?: boolean;
}

export interface IUserContextType {
    user: IUser | null;
    isFetchingUser: boolean;
    login: (userData: ILoginCandidate) => Promise<void>;
    logout: () => void;
    signup: (userData: ICandidate) => Promise<void>;
    removeToken: () => void;
    getToken: () => string | null;
    userIsLoggedIn: () => boolean;
    updateUserDetails: (field: keyof IUser, value: any) => void;
    getUserWorkoutProgram: () => void;
    saveUserDetails: (field: keyof IUser, value: any) => Promise<void>;
    isFromStepTwo: () => boolean;
    setFromStepTwo: (value: boolean) => void;
}

const UserContext = createContext<IUserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isFetchingUser, setIsFetchingUser] = useState(true);
    const [token, setToken] = useState<string | null>(null);
    const [fromStepTwoUserContext, setFromStepTwoUserContext] = useState(false);

    useEffect(() => {
        // Check for existing session (e.g., in localStorage)
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse user from local storage", error);
                localStorage.removeItem("user");
            }
        }

        checkToken();
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

    const checkToken = async () => {

        const userToken = Cookies.get('user_token');
        console.log("userToken", userToken);
        if (!userToken) {
            console.log("flag1 : fetching user", isFetchingUser);
            setUser(null);
            setToken(null);
            setIsFetchingUser(false);
            console.log("flag2 : fetching user", isFetchingUser);
            return;
        }
        const response = await authService.checkToken(userToken);

        if (response.status === "success") {
            setUser(response.user);
            setToken(response.access_token);
            setIsFetchingUser(false);
        }

        if (response.status === "error") {
            setUser(null);
            setToken(null);
            setIsFetchingUser(false);
            throw new Error(response.message);
        }
    }

    const login = async (userData: ILoginCandidate) => {
        const response = await authService.login(userData);

        if (response.status === "success") {
            setUser(response.user);
            Cookies.set('user_token', response.access_token, { expires: 1 });
        }

        if (response.status === "error") {
            throw new Error(response.message);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const signup = async (userData: ICandidate) => {
        const response = await authService.createUser(userData);

        if (response.status === "success") {
            // redirects user directly to onboarding page
            setUser(response.user);
            Cookies.set('user_token', response.token, { expires: 1 / 24 }); // 1 hour
        }

        if (response.status === "error") {
            throw new Error(response.message);
        }
    };

    const removeToken = () => {
        Cookies.remove('user_token');
    };

    const getToken = (): string | null => {
        return token || Cookies.get('user_token') || '';
    }

    const userIsLoggedIn = (): boolean => {
        return user !== null && getToken() !== null;
    }

    const updateUserDetails = async (field: keyof IUser, value: any) => {
        if (!user) return;
        setUser({ ...user, [field]: value });
    };

    const saveUserDetails = async (field: keyof IUser, value: any) => {
        if (!user) return;
        console.log("saveUserDetails", field, value);
        console.log(user[field], value);

        if (field === "age") {
            value = parseInt(value);
        }

        if (field === "weight") {
            value = parseFloat(value);
        }

        if (field === "height") {
            value = parseInt(value);
        }

        if (user[field] === value) return;
        console.log("return flag")

        await userService.updateUserDetails(user.id, field, value).then((response) => {
            if (response.status === "success") {
                setUser(response.user);
            }
        });
    };

    const getUserWorkoutProgram = async () => {
        if (!user) return;
        const response = await workoutService.getUserWorkOut(user.id);

        console.log(response);
    };

    const isFromStepTwo = () => {
        return fromStepTwoUserContext;
    };

    const setFromStepTwo = (value: boolean) => {
        setFromStepTwoUserContext(value);
    };

    return (
        <UserContext.Provider
            value={{
                user,
                isFetchingUser,
                login,
                logout,
                signup,
                removeToken,
                getToken,
                userIsLoggedIn,
                updateUserDetails,
                saveUserDetails,
                getUserWorkoutProgram,
                isFromStepTwo,
                setFromStepTwo
            }}>
            {children}
        </UserContext.Provider>
    );
};

export const getUserContext = () => {
    const context = useContext(UserContext);
    if (!!!context) {
        throw new Error("getUserContext must be used within a UserProvider");
    }
    return context;
};
