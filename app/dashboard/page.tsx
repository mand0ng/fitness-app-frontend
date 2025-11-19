'use client';
import Header from "../components/header";
import Footer from "../components/footer";
import MyCalendar from "./components/my-calendar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

class User {
    email: string
    name: string
    age: number
    height: number
    weight: number
    fitness_level: string
    fitness_goal: string
    work_out_location: string
    days_availability: string[]
    equipment_availability: string[]
    notes: string
    
    constructor(
        email: string, 
        name: string, 
        age: number, 
        height: number, 
        weight: number, 
        fitness_level: string, 
        fitness_goal: string, 
        work_out_location: string, 
        days_availability: string[], 
        equipment_availability: string[], 
        notes: string) {

        this.email = email;
        this.name = name;
        this.age = age;
        this.height = height;
        this.weight = weight;
        this.fitness_level = fitness_level;
        this.fitness_goal = fitness_goal;
        this.work_out_location = work_out_location;
        this.days_availability = days_availability;
        this.equipment_availability = equipment_availability;
        this.notes = notes;
    }
}

const Dashboard = () =>{
    const [token, setToken] = useState<string | null>(null);
    const [userData, setUserData] = useState<User | null>(null);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [localVarsSet, setLocalVarsSet] = useState(false);

    useEffect(() => {
        console.log("Dashboard mounted, getting token from localStorage");
        setToken(localStorage.getItem("token"));
        setLocalVarsSet(true);
    }, []);


    const checkToken = async () => {

        if (!localVarsSet) return;
        
        if (!token) {
            console.log("Dashboard: no token, go to login");
            router.push("/login");
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/check-token/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const data = await response.json();
            
            if (response.ok) {
                
                if (data.status === "success") {
                    
                    if (data.onboarding == "complete") {
                        // router.push("/dashboard");

                        const user = new User(
                            data.user.email,
                            data.user.name,
                            data.user.age,
                            data.user.height,
                            data.user.weight,
                            data.user.fitness_level,
                            data.user.fitness_goal,
                            data.user.work_out_location,
                            data.user.days_availability,
                            data.user.equipment_availability,
                            data.user.notes
                        );
                        setUserData(user);
                        setLoading(false);
                    } else {
                        router.push("/onboarding");
                        console.log("dashboard")
                    }
                }
            } else {
                console.error("Token is invalid:", data);
                localStorage.removeItem("token");
                setToken(null);
                router.push("/login");
            }
      } catch (error) {
        console.error("Error checking token:", error);
      }
        
    };

    useEffect(() => {
        checkToken();
    }, [token, localVarsSet]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <p className="sub-text text-xl">Loading...</p>
            </div>
        );
    }

    return (
        <section>
            <Header />
                <section className="m-20">
                    <div className="border border-(--muted) rounded-lg shadow-lg p-10 my-secondary-bg mb-10">
                        <h1 className="text-2xl font-bold mb-2">Welcome back Jane Doe!</h1>
                    </div>
                    <MyCalendar />
                </section>
            <Footer />
        </section>
    );
};

export default Dashboard;