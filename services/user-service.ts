import { IUser } from "@/context/user-context";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const userService = {
    updateUserDetails: async (userId: string, field: keyof IUser, value: any) => {
        if (!API_URL) throw new Error("API_URL is not defined");

        const response = await fetch(`${API_URL}/update-user-details/${userId}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("user_token")}`,
            },
            body: JSON.stringify({ [field]: value }),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Failed to update user details");

        return data;
    }

}